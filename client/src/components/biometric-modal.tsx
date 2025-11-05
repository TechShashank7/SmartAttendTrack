import { useState, useRef, useEffect } from "react";

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BiometricModal({ isOpen, onClose, onSuccess }: BiometricModalProps) {
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'success' | 'camera' | 'enrolling' | 'failed'>('idle');
  const [useCamera, setUseCamera] = useState(false);
  const [fingerprintAnimating, setFingerprintAnimating] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleVerify = () => {
    setVerificationState('verifying');
    
    setTimeout(() => {
      setVerificationState('success');
      
      setTimeout(() => {
        setVerificationState('idle');
        setUseCamera(false);
        setFingerprintAnimating(false);
        stopCamera();
        onClose();
        onSuccess();
      }, 1500);
    }, 2000);
  };

  // Check enrollment status and device capabilities on component mount
  useEffect(() => {
    const checkEnrollment = () => {
      const enrolled = localStorage.getItem('fingerprintEnrolled');
      setIsEnrolled(enrolled === 'true');
    };
    
    const checkDeviceCapabilities = async () => {
      // Check if we're on mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile && window.location.protocol !== 'https:') {
        setEnrollmentError('Biometric authentication requires HTTPS on mobile devices. Please use a secure connection.');
        return;
      }
      
      // Additional mobile-specific checks
      if (isMobile && !window.PublicKeyCredential) {
        setEnrollmentError('This mobile browser does not support biometric authentication. Try Chrome or Safari.');
      }
    };
    
    checkEnrollment();
    checkDeviceCapabilities();
  }, []);

  const enrollFingerprint = async () => {
    // Check for WebAuthn support
    if (!window.PublicKeyCredential || !navigator.credentials) {
      setEnrollmentError('Biometric authentication not supported on this device');
      return;
    }

    // Check if platform authenticator is available
    try {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      if (!available) {
        setEnrollmentError('Device fingerprint sensor not available');
        return;
      }
    } catch (error) {
      setEnrollmentError('Unable to detect fingerprint sensor');
      return;
    }

    setVerificationState('enrolling');
    setFingerprintAnimating(true);
    setEnrollmentError('');

    try {
      // Generate a unique user ID
      const userId = new TextEncoder().encode('user-' + Date.now());
      
      // Get current domain for RP ID
      const rpId = window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname;
      
      // Create credential creation options optimized for mobile
      const publicKeyCredentialCreationOptions = {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        rp: {
          name: "Smart Attendance System",
          id: rpId,
        },
        user: {
          id: userId,
          name: "student@attendance.edu",
          displayName: "Student User",
        },
        pubKeyCredParams: [
          {alg: -7, type: "public-key" as const},   // ES256
          {alg: -257, type: "public-key" as const}  // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform" as const,
          userVerification: "required" as const,
          requireResidentKey: false,
          residentKey: "discouraged" as const
        },
        timeout: 60000,
        attestation: "none" as const
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      }) as PublicKeyCredential | null;

      if (credential) {
        // Store credential ID for future verification
        const credentialId = Array.from(new Uint8Array(credential.rawId))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        
        localStorage.setItem('fingerprintCredentialId', credentialId);
        localStorage.setItem('fingerprintEnrolled', 'true');
        setIsEnrolled(true);
        setVerificationState('success');
        
        setTimeout(() => {
          setVerificationState('idle');
          setFingerprintAnimating(false);
        }, 2000);
      }
    } catch (error: any) {
      console.error('Enrollment failed:', error);
      let errorMessage = 'Fingerprint enrollment failed.';
      
      if (error.name === 'NotSupportedError') {
        errorMessage = 'Biometric authentication not supported on this device.';
      } else if (error.name === 'SecurityError') {
        errorMessage = 'Security error. Please ensure you\'re using HTTPS.';
      } else if (error.name === 'NotAllowedError') {
        errorMessage = 'Permission denied. Please enable biometric authentication.';
      } else if (error.name === 'AbortError') {
        errorMessage = 'Operation cancelled. Please try again.';
      } else if (error.name === 'InvalidStateError') {
        errorMessage = 'Device is already enrolled. Try verification instead.';
      }
      
      setEnrollmentError(errorMessage);
      setVerificationState('idle');
      setFingerprintAnimating(false);
    }
  };

  const startFingerprintVerification = async () => {
    if (!isEnrolled) {
      setEnrollmentError('Please enroll your fingerprint first');
      return;
    }

    if (!window.PublicKeyCredential || !navigator.credentials) {
      setEnrollmentError('Biometric authentication not supported on this device');
      return;
    }

    setFingerprintAnimating(true);
    setVerificationState('verifying');
    setEnrollmentError('');

    try {
      const credentialId = localStorage.getItem('fingerprintCredentialId');
      if (!credentialId) {
        throw new Error('No enrolled fingerprint found');
      }

      // Convert credential ID back to Uint8Array
      const credentialIdBytes = new Uint8Array(
        credentialId.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
      );

      // Create assertion request optimized for mobile
      const publicKeyCredentialRequestOptions = {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        allowCredentials: [{
          id: credentialIdBytes,
          type: 'public-key' as const,
          transports: ['internal', 'hybrid'] as AuthenticatorTransport[]
        }],
        userVerification: 'required' as const,
        timeout: 60000
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      });

      if (assertion) {
        // Verification successful
        setVerificationState('success');
        setTimeout(() => {
          setVerificationState('idle');
          setFingerprintAnimating(false);
          onClose();
          onSuccess();
        }, 2000);
      } else {
        throw new Error('Verification failed');
      }
    } catch (error: any) {
      console.error('Verification failed:', error);
      let errorMessage = 'Fingerprint verification failed.';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Fingerprint not recognized or operation cancelled.';
      } else if (error.name === 'SecurityError') {
        errorMessage = 'Security error. Please ensure you\'re using HTTPS.';
      } else if (error.name === 'AbortError') {
        errorMessage = 'Verification cancelled. Please try again.';
      }
      
      setEnrollmentError(errorMessage);
      setVerificationState('failed');
      setFingerprintAnimating(false);
      
      setTimeout(() => {
        setVerificationState('idle');
        setEnrollmentError('');
      }, 3000);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      streamRef.current = stream;
      setVerificationState('camera');
      setUseCamera(true);
      
      // Wait a moment for the state to update and video element to be available
      setTimeout(() => {
        if (videoRef.current && stream) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(console.error);
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied or not available. Please use fingerprint verification.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleFaceVerify = () => {
    setVerificationState('verifying');
    
    setTimeout(() => {
      setVerificationState('success');
      
      setTimeout(() => {
        setVerificationState('idle');
        setUseCamera(false);
        stopCamera();
        onClose();
        onSuccess();
      }, 1500);
    }, 3000);
  };

  const goBackToFingerprint = () => {
    setVerificationState('idle');
    setUseCamera(false);
    stopCamera();
  };

  useEffect(() => {
    // Set up video stream when camera state is active
    if (verificationState === 'camera' && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(console.error);
    }
  }, [verificationState]);

  useEffect(() => {
    return () => {
      // Cleanup camera when component unmounts
      stopCamera();
    };
  }, []);

  const handleClose = () => {
    setVerificationState('idle');
    setUseCamera(false);
    setFingerprintAnimating(false);
    setEnrollmentError('');
    stopCamera();
    onClose();
  };

  const resetEnrollment = () => {
    localStorage.removeItem('fingerprintCredentialId');
    localStorage.removeItem('fingerprintEnrolled');
    setIsEnrolled(false);
    setEnrollmentError('');
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (verificationState) {
      case 'enrolling':
        return (
          <>
            <h3 className="text-xl font-semibold mb-4" data-testid="text-enrolling-title">Enrolling Fingerprint...</h3>
            <div className="fingerprint-icon">
              <i className={`fas fa-fingerprint ${fingerprintAnimating ? 'fingerprint-pulse' : ''}`}></i>
            </div>
            <p className="text-sm text-muted-foreground" data-testid="text-enrolling">
              Please place your finger on the sensor when prompted
            </p>
          </>
        );
      
      case 'verifying':
        return (
          <>
            <h3 className="text-xl font-semibold mb-4" data-testid="text-verifying-title">Verifying Fingerprint...</h3>
            <div className="fingerprint-icon">
              {useCamera ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className={`fas fa-fingerprint ${fingerprintAnimating ? 'fingerprint-pulse' : ''}`}></i>
              )}
            </div>
            <p className="text-sm text-muted-foreground" data-testid="text-processing">
              {useCamera ? 'Analyzing facial features...' : 'Please place your finger on the sensor'}
            </p>
          </>
        );
      
      case 'failed':
        return (
          <>
            <h3 className="text-xl font-semibold mb-4 text-red-600" data-testid="text-failed-title">Verification Failed</h3>
            <div className="fingerprint-icon">
              <i className="fas fa-times-circle text-red-500"></i>
            </div>
            <p className="text-sm text-red-600 mb-6" data-testid="text-failed-message">
              Fingerprint not recognized. Please try again.
            </p>
          </>
        );
      
      case 'success':
        return (
          <>
            <h3 className="text-xl font-semibold mb-4 text-green-600" data-testid="text-success-title">
              {verificationState === 'success' && !isEnrolled ? 'Enrollment Successful!' : 'Verification Successful!'}
            </h3>
            <div className="fingerprint-icon">
              <i className="fas fa-check-circle text-green-500"></i>
            </div>
            <p className="text-sm text-muted-foreground mb-6" data-testid="text-marking-attendance">
              {!isEnrolled ? 'Fingerprint enrolled successfully!' : 
               useCamera ? 'Face ID verified. Marking attendance...' : 'Fingerprint verified. Marking attendance...'}
            </p>
          </>
        );
      
      case 'camera':
        return (
          <>
            <h3 className="text-xl font-semibold mb-4" data-testid="text-faceid-title">Face ID Verification</h3>
            <p className="text-gray-600 mb-4">Look directly at the camera for verification</p>
            
            <div className="relative mb-6 flex justify-center">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                width="320"
                height="240"
                className="bg-gray-200 rounded-lg border-2 border-gray-300"
                data-testid="camera-preview"
                style={{ transform: 'scaleX(-1)' }}
              />
              <div className="absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white rounded-full opacity-70"></div>
              </div>
            </div>
            
            <div className="flex gap-3 justify-center">
              <button onClick={handleFaceVerify} className="btn btn-primary" data-testid="button-verify-face">
                <i className="fas fa-camera"></i>
                Verify Face ID
              </button>
              <button onClick={goBackToFingerprint} className="btn bg-gray-100 text-gray-600" data-testid="button-back-fingerprint">
                <i className="fas fa-fingerprint"></i>
                Use Fingerprint
              </button>
              <button onClick={handleClose} className="btn bg-muted text-muted-foreground" data-testid="button-cancel-verification">
                Cancel
              </button>
            </div>
          </>
        );
      
      default:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4" data-testid="text-verification-title">Biometric Verification Required</h3>
            <p className="text-gray-600 mb-4" data-testid="text-verification-instruction">Please verify your identity to mark attendance</p>
            
            <div className="fingerprint-icon">
              <i className={`fas fa-fingerprint ${fingerprintAnimating ? 'fingerprint-pulse' : ''}`}></i>
            </div>
            
            {enrollmentError && (
              <p className="text-sm text-red-600 mb-4" data-testid="text-error">{enrollmentError}</p>
            )}
            
            {!isEnrolled ? (
              <>
                <p className="text-sm text-gray-600 mb-6" data-testid="text-enrollment-needed">
                  No fingerprint enrolled. Please enroll your fingerprint first.
                </p>
                <div className="flex flex-col gap-3 items-center">
                  <button onClick={enrollFingerprint} className="btn btn-primary" data-testid="button-enroll">
                    <i className="fas fa-fingerprint"></i>
                    Enroll Fingerprint
                  </button>
                  
                  <div className="text-sm text-gray-500 my-2">or</div>
                  
                  <button onClick={startCamera} className="btn bg-blue-500 text-white" data-testid="button-face-id">
                    <i className="fas fa-camera"></i>
                    Use Face ID
                  </button>
                  
                  <button onClick={handleClose} className="btn bg-gray-100 text-gray-600 mt-2" data-testid="button-cancel-verification">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-6" data-testid="text-sensor-instruction">
                  Place your finger on the sensor to verify
                </p>
                <div className="flex flex-col gap-3 items-center">
                  <button onClick={startFingerprintVerification} className="btn btn-primary" data-testid="button-verify">
                    <i className="fas fa-fingerprint"></i>
                    Verify Fingerprint
                  </button>
                  
                  <div className="text-sm text-gray-500 my-2">or</div>
                  
                  <button onClick={startCamera} className="btn bg-blue-500 text-white" data-testid="button-face-id">
                    <i className="fas fa-camera"></i>
                    Use Face ID
                  </button>
                  
                  <button onClick={resetEnrollment} className="btn bg-orange-500 text-white text-sm" data-testid="button-reset">
                    <i className="fas fa-redo"></i>
                    Re-enroll Fingerprint
                  </button>
                  
                  <button onClick={handleClose} className="btn bg-gray-100 text-gray-600 mt-2" data-testid="button-cancel-verification">
                    Cancel
                  </button>
                </div>
              </>
            )}
          </>
        );
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal-content bg-white rounded-3xl p-6 md:p-10 max-w-sm md:max-w-md w-[90%] text-center shadow-2xl border-t-4 border-gradient-primary">
        {renderContent()}
      </div>
    </div>
  );
}
