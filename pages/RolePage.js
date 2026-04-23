// Role Page Object

export class RolePage {
  constructor(page) {
    this.page = page;

    // Change Institute button (only visible for multi-institute users)
    this.changeInstituteBtn = page.getByRole('button', {
      name: /change institute/i
    });
  }

  // Select role using exact match (fixes strict mode issue)
  async selectRole(roleName) {
    await this.page.getByText(roleName, { exact: true }).click();
  }

  // Click Change Institute (only when visible)
  async clickChangeInstitute() {
    await this.changeInstituteBtn.click();
  }
}