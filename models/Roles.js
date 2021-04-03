const { Schema, model } = require("mongoose");

module.exports = model(
    'Role',
    Schema ({
        role: {
            type: String,
            required: [ true, "The role is required" ]
        }
    })
)