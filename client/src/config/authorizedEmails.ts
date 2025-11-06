export const authorizedEmails = {
  teachers: [
    "teacher1@kiet.edu",
    "teacher2@kiet.edu",
    "teacher3@kiet.edu"
  ],
  students: [
    "shashank.2428cseai17@kiet.edu"
    "swayam.2428cseai1154@kiet.edu",
    "yogesh.2428cseai877@kiet.edu",
    "shobhit.2428cseai123@kiet.edu",
    "utkarsh.2428cseai146@kiet.edu",
  ]
};

export function getUserRole(email: string): 'teacher' | 'student' | null {
  const normalizedEmail = email.toLowerCase().trim();
  
  if (authorizedEmails.teachers.includes(normalizedEmail)) {
    return 'teacher';
  }
  
  if (authorizedEmails.students.includes(normalizedEmail)) {
    return 'student';
  }
  
  return null;
}
