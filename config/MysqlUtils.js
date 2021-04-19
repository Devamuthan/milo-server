const config ={
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'milo'
}

module.exports = config



/*
 Creating the admin table:
 create table admin(adminid varchar(20) primary key not null, password varchar(50) not null);

 Creating the schedules table:
 create table schedules(adminid varchar(20) not null, subcode varchar(10), primary key(adminid, subcode));

 Creating the questions tables:
 create table questions(subcode varchar(10) not null, question varchar(200) not null, option1 varchar(20) not null, option2 varchar(20) not null, option3 varchar(20) not null, option4 varchar(20) not null, answer varchar(1) not null);
 */