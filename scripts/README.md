# Scripts Folder

This folder contains utility scripts for generating and managing data for the project. Below is a detailed guide on how to use the provided scripts effectively.

---

## File: `generateData.ts`

### Purpose:

This script is used to generate dummy data for the database, including users, categories, and transactions. It helps to seed the database with realistic data for testing and development purposes.

### How to Use:

1. **Ensure the Database Connection is Set Up**

    - Before running the script, make sure the database is configured properly in your `.env` file with the `DATABASE_URL` variable pointing to your PostgreSQL instance.

2. **Run the Script**

    - Use the following command to execute the script:
        ```bash
        npx ts-node scripts/generateData.ts
        ```

3. **Expected Output**

    - The script will:
        - Create 10 dummy users.
        - Create 5 dummy categories.
        - Create 100 dummy transactions, each linked to a random user and category.
    - Logs will display the creation progress, such as:
        ```plaintext
        Created user: John Doe (john.doe@example.com)
        Created category: Electronics
        Created income transaction for user John Doe in category Electronics: Expand market reach - $5000.00
        ```

4. **Error Handling**

    - If an error occurs during execution, it will be logged, and the script will terminate. Ensure that:
        - The database is running.
        - The schema is up to date by running:
            ```bash
            npx prisma migrate dev
            ```

5. **Custom Adjustments**
    - If you need to generate a different number of records or adjust the data types, modify the respective loop limits or fields in the `generateData.ts` file.

---

### Notes:

-   **Prisma Dependency**: This script uses Prisma to interact with the database. Ensure Prisma is installed and configured in the project.
-   **Script Location**: Keep this script inside the `scripts` folder for organization.

For any issues or further assistance, refer to the main project documentation or reach out to the development team.
