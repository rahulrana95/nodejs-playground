import prisma from "../prisma";

// Define a function to delete all users
const deleteAllUsers = async () => {
    try {
      // Delete all records from the UserLogin table
      const deleteResult = await prisma.userLogin.deleteMany();
  
      console.log(`Deleted ${deleteResult.count} users.`);
      
    } catch (error) {
      console.error('Error deleting users:', error);
    }
};

export {
    deleteAllUsers
}