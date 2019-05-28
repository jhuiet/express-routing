const event_attendance = (sequelize, DataTypes) => {
    const Event_Attendance = sequelize.define('event_attendance', {
        eventId: {
            type: Sequelize.INTEGER,

        }
    })
}