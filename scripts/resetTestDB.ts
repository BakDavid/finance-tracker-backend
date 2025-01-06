import { exec } from "child_process";

const resetTestDB = () => {
    console.log("Resetting the test database...");
    exec(
        "npx prisma migrate reset --force --schema=prisma/schema.prisma",
        (err, stdout, stderr) => {
            if (err) {
                console.error("Failed to reset the test database:", stderr);
                process.exit(1);
            }
            console.log(stdout);
        }
    );
};

resetTestDB();
