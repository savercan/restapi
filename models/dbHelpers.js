const knex = require('knex');
const config = require('../knexfile');
const db2 = knex(config.development);
const db = require("../dbConfig");

module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    addMessage,
    findLessonMessages
};

async function add(lesson){
    const [id] = await db("lessons").insert(lesson);

    return id
}

function find(){
    return db('lessons')
}

function findById(id){
    return db("lessons")
    .where({id:id})
    .first()
}

function remove(id){
    return db('lessons')
    .where({id:id})
    .del()
}

function update(id, changes){
    return (
        db("lessons")
        .where({id:id})
        .update(changes)
        .then(() =>{
            return findById(id)
        })
    )
}

function findMessageById(id){
    return db("messages")
    .where({id:id})
    .first();
}

async function addMessage(message, lesson_id){
    const [id] = await db("messages")
    .where({lesson_id : lesson_id})
    .insert(message)
    return findMessageById(id);
}

function findLessonMessages(lesson_id){
    return db("lessons")
    .join ("messages", "lessons.id", "messages.lesson_id")
    .select(
        "lessons_id as LessonID",
        "lessons.name as LessonName",
        "messages.sender",
        "messages.text"
    )
    .where({lesson_id : lesson_id})
}