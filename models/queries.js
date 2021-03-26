const select_query = () => {
    return `select * from Employee`;
}
const insert_query = (table, fields) => {
    console.log(fields);
    return `insert into ${ table } ( name, email, age, salary ) values ( "${ fields.name }", "${ fields.email }", ${ fields.age }, ${ fields.salary } )`;
}
module.exports = {
    select_query,
    insert_query
}