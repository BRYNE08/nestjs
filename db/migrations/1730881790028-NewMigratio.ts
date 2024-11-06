import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigratio1730881790028 implements MigrationInterface {
    name = 'NewMigratio1730881790028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`learner\` (\`learnerId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`surname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`stream\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`teacherId\` int NOT NULL, UNIQUE INDEX \`IDX_8587dac1159aaf2a66799792d4\` (\`email\`), PRIMARY KEY (\`learnerId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`learner_subject\` (\`id\` int NOT NULL AUTO_INCREMENT, \`learnerId\` int NOT NULL, \`subjectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subject\` (\`subjectId\` int NOT NULL AUTO_INCREMENT, \`subjectName\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`subjectId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teacher\` (\`teacherId\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`stream\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`subjectId\` int NULL, UNIQUE INDEX \`REL_060316d200c20658db1b1de663\` (\`subjectId\`), PRIMARY KEY (\`teacherId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`learner\` ADD CONSTRAINT \`FK_881dc4b2f69e03b399c46a92ce3\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`teacherId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`learner_subject\` ADD CONSTRAINT \`FK_811bb861aa4bd4f629aa43bb121\` FOREIGN KEY (\`learnerId\`) REFERENCES \`learner\`(\`learnerId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`learner_subject\` ADD CONSTRAINT \`FK_58ef5c541ea41cec754d6917069\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`subjectId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teacher\` ADD CONSTRAINT \`FK_060316d200c20658db1b1de6639\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`subjectId\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`teacher\` DROP FOREIGN KEY \`FK_060316d200c20658db1b1de6639\``);
        await queryRunner.query(`ALTER TABLE \`learner_subject\` DROP FOREIGN KEY \`FK_58ef5c541ea41cec754d6917069\``);
        await queryRunner.query(`ALTER TABLE \`learner_subject\` DROP FOREIGN KEY \`FK_811bb861aa4bd4f629aa43bb121\``);
        await queryRunner.query(`ALTER TABLE \`learner\` DROP FOREIGN KEY \`FK_881dc4b2f69e03b399c46a92ce3\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_060316d200c20658db1b1de663\` ON \`teacher\``);
        await queryRunner.query(`DROP TABLE \`teacher\``);
        await queryRunner.query(`DROP TABLE \`subject\``);
        await queryRunner.query(`DROP TABLE \`learner_subject\``);
        await queryRunner.query(`DROP INDEX \`IDX_8587dac1159aaf2a66799792d4\` ON \`learner\``);
        await queryRunner.query(`DROP TABLE \`learner\``);
    }

}
