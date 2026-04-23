// Test Data for Playwright Automation
// Covers all scenarios: invalid, no institute, single institute, multiple roles, multi-institute

export const users = {

  // Invalid User
  invalidUser: {
    email: "x@scos.com",
    password: "Admin@123",
    type: "invalid"
  },

  // No Institute User 
  noInstituteUser: {
    email: "a@scos.com",
    password: "Admin@123",
    institutes: []
  },

  // Single Institute, Single Role
  singleRoleUser: {
    email: "b@scos.com",
    password: "Admin@123",
    institutes: [
      {
        id: 1,
        name: "North Park Academy",
        roles: ["Admin"]
      }
    ]
  },

  // Single Institute, Multiple Roles 
  multiRoleUser: {
    email: "c@scos.com",
    password: "Admin@123",
    institutes: [
      {
        id: 1,
        name: "North Park Academy",
        roles: ["Admin", "Teacher"]
      }
    ]
  },

  // Multiple Institutes + Multiple Roles 
  multiInstituteUser: {
    email: "d@scos.com",
    password: "Admin@123",
    institutes: [
      {
        id: 1,
        name: "North Park Academy",
        roles: ["Admin", "Teacher"]
      },
      {
        id: 2,
        name: "EarlyBell College",
        roles: ["Student", "Teacher"]
      },
       {
        id: 3,
        name: "Renaissance Academy",
        roles: []              //No roles-Direct to Dashboard
      },
      {
        id: 4,
        name: "Pune University",
        roles: []               //No roles-Direct to Dashboard
      },
       {
        id: 5,
        name: "Mount Carmel School",
        roles: []               //No roles-Direct to Dashboard
      },
      {
        id: 6,
        name: "Samhita Academy",
        roles: []               //No roles-Direct to Dashboard
      }
    ]
  }

};