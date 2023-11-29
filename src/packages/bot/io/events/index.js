const { eventDocument, REGEX_EVENT_DOCUMENT } = require('./eventDocument')
const { eventLocation, REGEX_EVENT_LOCATION } = require('./eventLocation')
const { eventMedia, REGEX_EVENT_MEDIA } = require('./eventMedia')
const { eventVoiceNote, REGEX_EVENT_VOICE_NOTE } = require('./eventVoiceNote')
const { eventOrder,REGEX_EVENT_ORDER } = require('./eventOrder')
const { eventWelcome } = require('./eventWelcome')
const { eventAction } = require('./eventAction')


const LIST_ALL = {
    WELCOME: eventWelcome(),
    MEDIA: eventMedia(),
    LOCATION: eventLocation(),
    DOCUMENT: eventDocument(),
    VOICE_NOTE: eventVoiceNote(),
    ACTION: eventAction(),
    ORDER: eventOrder(),
}

const LIST_REGEX = {
    REGEX_EVENT_DOCUMENT,
    REGEX_EVENT_LOCATION,
    REGEX_EVENT_MEDIA,
    REGEX_EVENT_VOICE_NOTE,
    REGEX_EVENT_ORDER,
}

module.exports = { LIST_ALL, LIST_REGEX }
