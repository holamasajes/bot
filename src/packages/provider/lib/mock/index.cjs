/** 
* NO TOCAR ESTE ARCHIVO: Es generado automaticamente, si sabes lo que haces adelante ;)
* de lo contrario mejor ir a la documentacion o al servidor de discord link.codigoencasa.com/DISCORD
*/
'use strict';

var require$$0$2 = require('node:events');
var require$$0 = require('crypto');
var require$$0$1 = require('kleur');
var require$$4 = require('console');
var require$$5 = require('fs');

const flatObject$2 = (listArray = []) => {
    const cbNestedList = Array.isArray(listArray) ? listArray : [];

    if (!listArray.length) return {}

    const cbNestedObj = cbNestedList.map(({ ctx }) => ctx?.callbacks).filter((i) => !!i);
    const queueCb = cbNestedObj.reduce((acc, current) => {
        const getKeys = Object.keys(current);
        const parse = getKeys.map((icb, i) => ({
            [icb]: Object.values(current)[i],
        }));
        return [...acc, ...parse]
    }, []);

    const flatObj = {};
    for (const iteration of queueCb) {
        const [keyCb] = Object.keys(iteration);
        flatObj[keyCb] = iteration[keyCb];
    }
    return flatObj
};

var flattener = { flatObject: flatObject$2 };

const crypto = require$$0;

/**
 * Generamos un UUID unico con posibilidad de tener un prefijo
 * @param {*} prefix
 * @returns
 */
const generateRef$a = (prefix = false) => {
    const id = crypto.randomUUID();
    return prefix ? `${prefix}_${id}` : id
};

/**
 * Generar randon sin prefijos hex
 * @returns
 */
const generateTime$1 = () => {
    return Date.now()
};

/**
 * Genera un HASH MD5
 * @param {*} param0
 * @returns
 */
const generateRefSerialize$2 = ({ index, answer, keyword }) =>
    crypto.createHash('md5').update(JSON.stringify({ index, answer, keyword })).digest('hex');

var hash = { generateRef: generateRef$a, generateRefSerialize: generateRefSerialize$2, generateTime: generateTime$1 };

const { generateRefSerialize: generateRefSerialize$1 } = hash;

/**
 * Crear referencia serializada
 * @param {*} flowJson
 * @returns array[]
 */
const toSerialize$4 = (flowJson) => {
    if (!Array.isArray(flowJson)) throw new Error('Esto debe ser un ARRAY')

    const jsonToSerialize = flowJson.map((row, index) => ({
        ...row,
        refSerialize: `${generateRefSerialize$1({
            index,
            keyword: row.keyword,
            answer: row.answer,
        })}`,
    }));

    return jsonToSerialize
};

var toSerialize_1 = { toSerialize: toSerialize$4 };

const { toSerialize: toSerialize$3 } = toSerialize_1;
/**
 * @deprecate
 * @param answer string
 * @param options {media:string, buttons:[], capture:true default false}
 * @returns
 */
const addChild$3 = (flowIn = null) => {
    if (!flowIn?.toJson) {
        throw new Error('DEBE SER UN FLOW CON toJSON()')
    }
    return toSerialize$3(flowIn.toJson())
};

var addChild_1 = { addChild: addChild$3 };

const toJson$3 = (inCtx) => () => {
    const lastCtx = inCtx.hasOwnProperty('ctx') ? inCtx.ctx : inCtx;
    return lastCtx.json
};

var toJson_1 = { toJson: toJson$3 };

const { flatObject: flatObject$1 } = flattener;
const { generateRef: generateRef$9 } = hash;
const { addChild: addChild$2 } = addChild_1;
const { toJson: toJson$2 } = toJson_1;
/**
 *
 * @param answer string
 * @param options {media:string, buttons:[{"body":"😎 Cursos"}], delay:ms, capture:true default false}
 * @returns
 */
const addAnswer$3 =
    (inCtx) =>
    (answer, options, cb = null, nested = []) => {
        answer = Array.isArray(answer) ? answer.join('\n') : answer;
        /**
         * Todas las opciones referentes a el mensaje en concreto options:{}
         * @returns
         */
        const getAnswerOptions = () => ({
            media: typeof options?.media === 'string' ? `${options?.media}` : null,
            buttons: Array.isArray(options?.buttons) ? options.buttons : [],
            capture: typeof options?.capture === 'boolean' ? options?.capture : false,
            child: typeof options?.child === 'string' ? `${options?.child}` : null,
            delay: typeof options?.delay === 'number' ? options?.delay : 0,
            idle: typeof options?.idle === 'number' ? options?.idle : null,
        });

        const getNested = () => {
            let flatNested = [];
            if (Array.isArray(nested)) {
                for (const iterator of nested) {
                    flatNested = [...flatNested, ...addChild$2(iterator)];
                }

                return {
                    nested: flatNested,
                }
            }
            return {
                nested: addChild$2(nested),
            }
        };

        /**
         * Esta funcion aplana y busca los callback anidados de los hijos
         * @returns
         */
        const getCbFromNested = () => flatObject$1(Array.isArray(nested) ? nested : [nested]);

        const callback = typeof cb === 'function' ? cb : () => null;

        const lastCtx = inCtx.hasOwnProperty('ctx') ? inCtx.ctx : inCtx;

        /**
         * Esta funcion se encarga de mapear y transformar todo antes
         * de retornar
         * @returns
         */
        const ctxAnswer = () => {
            const ref = `ans_${generateRef$9()}`;

            const options = {
                ...getAnswerOptions(),
                ...getNested(),
                keyword: {},
                callback: !!cb,
            };

            const json = [].concat(inCtx.json).concat([
                {
                    ref,
                    keyword: lastCtx.ref,
                    answer,
                    options,
                },
            ]);

            const callbacks = {
                ...inCtx.callbacks,
                ...getCbFromNested(),
                [ref]: callback,
            };

            return {
                ...lastCtx,
                ref,
                answer,
                json,
                options,
                callbacks,
            }
        };

        /// Retornar contexto no colocar nada más abajo de esto
        const ctx = ctxAnswer();

        return {
            ctx,
            ref: ctx.ref,
            addAnswer: addAnswer$3(ctx),
            addAction: (cb = () => null, flagCb = () => null) => {
                if (typeof cb === 'object') return addAnswer$3(ctx)('__capture_only_intended__', cb, flagCb)
                return addAnswer$3(ctx)('__call_action__', null, cb)
            },
            toJson: toJson$2(ctx),
        }
    };

var addAnswer_1 = { addAnswer: addAnswer$3 };

const { generateRef: generateRef$8 } = hash;
const { addAnswer: addAnswer$2 } = addAnswer_1;
const { toJson: toJson$1 } = toJson_1;

/**
 *
 * @param {*} message `string | string[]`
 * @param {*} options {sensitive:boolean} default false
 */
const addKeyword$2 = (keyword, options) => {
    if (typeof keyword !== 'string' && !Array.isArray(keyword)) {
        throw new Error('DEBE_SER_STRING_ARRAY_REGEX')
    }

    const parseOptions = () => {
        const defaultProperties = {
            sensitive: typeof options?.sensitive === 'boolean' ? options?.sensitive : false,
            regex: typeof options?.regex === 'boolean' ? options?.regex : false,
        };

        return defaultProperties
    };

    const ctxAddKeyword = () => {
        const ref = `key_${generateRef$8()}`;
        const options = parseOptions();
        const json = [
            {
                ref,
                keyword,
                options,
            },
        ];
        /**
         * Se guarda en db
         */

        return { ref, keyword, options, json }
    };

    const ctx = ctxAddKeyword();

    return {
        ctx,
        ref: ctx.ref,
        addAnswer: addAnswer$2(ctx),
        addAction: (cb = () => null) => addAnswer$2(ctx)('__call_action__', null, cb),
        toJson: toJson$1(ctx),
    }
};

var addKeyword_1 = { addKeyword: addKeyword$2 };

const { generateRef: generateRef$7, generateRefSerialize } = hash;
/**
 * @deprecate
 * @param answer string
 * @param options {media:string, buttons:[], capture:true default false}
 * @returns
 */
const toCtx$2 = ({ body, from, prevRef, options = {}, index }) => {
    return {
        ref: generateRef$7(),
        keyword: prevRef,
        answer: body,
        options: options ?? {},
        from,
        refSerialize: generateRefSerialize({ index, answer: body }),
    }
};

var toCtx_1 = { toCtx: toCtx$2 };

const { addAnswer: addAnswer$1 } = addAnswer_1;
const { addKeyword: addKeyword$1 } = addKeyword_1;
const { addChild: addChild$1 } = addChild_1;
const { toSerialize: toSerialize$2 } = toSerialize_1;
const { toCtx: toCtx$1 } = toCtx_1;
const { toJson } = toJson_1;

var methods = { addAnswer: addAnswer$1, addKeyword: addKeyword$1, addChild: addChild$1, toCtx: toCtx$1, toJson, toSerialize: toSerialize$2 };

const { yellow, bgRed } = require$$0$1;
const NODE_ENV$1 = process.env.NODE_ENV || 'dev';
const printer$1 = (message, title) => {
    if (NODE_ENV$1 !== 'test') {
        if (title) console.log(bgRed(`${title}`));
        console.log(yellow(Array.isArray(message) ? message.join('\n') : message));
        console.log(``);
    }
};

var interactive = { printer: printer$1 };

const delay$2 = (miliseconds) => new Promise((res) => setTimeout(res, miliseconds));

var delay_1 = { delay: delay$2 };

let Queue$1 = class Queue {
    constructor(logger, concurrencyLimit = 15, timeout = 20000) {
        this.queue = new Map();
        this.queueTime = new Map();
        this.timers = new Map();
        this.idsCallbacks = new Map();
        this.workingOnPromise = new Map();
        this.logger = logger;
        this.timeout = timeout;
        this.concurrencyLimit = concurrencyLimit;
    }

    /**
     * Encola el proceso
     * @param {*} from
     * @param {*} promiseFunc
     * @returns
     */
    async enqueue(from, promiseInFunc, fingerIdRef) {
        this.logger.log(`${from}:ENCOLADO ${fingerIdRef}`);

        if (!this.timers.has(fingerIdRef)) {
            this.timers.set(fingerIdRef, false);
        }

        if (!this.queue.has(from)) {
            this.queue.set(from, []);
            this.workingOnPromise.set(from, false);
        }

        const queueByFrom = this.queue.get(from);
        const workingByFrom = this.workingOnPromise.get(from);

        const promiseFunc = (item) => {
            const timer = ({ resolve }) =>
                setTimeout(() => {
                    console.log('no debe aparecer si la otra funcion del race se ejecuta primero 🙉🙉🙉🙉', fingerIdRef);
                    resolve('timeout');
                }, this.timeout);

            const timerPromise = new Promise((resolve, reject) => {
                if (item.cancelled) {
                    reject('cancelled');
                }
                if (!this.timers.has(fingerIdRef)) {
                    const refIdTimeOut = timer({ reject, resolve });
                    clearTimeout(this.timers.get(fingerIdRef));
                    this.timers.set(fingerIdRef, refIdTimeOut);
                    return refIdTimeOut
                }

                return this.timers.get(fingerIdRef)
            });

            const cancel = () => {
                clearTimeout(this.timers.get(fingerIdRef));
                this.timers.delete(fingerIdRef);
            };
            return { promiseInFunc, timer, timerPromise, cancel }
        };

        return new Promise((resolve, reject) => {
            queueByFrom.push({
                promiseFunc,
                fingerIdRef,
                cancelled: false,
                resolve,
                reject,
            });

            if (!workingByFrom) {
                this.logger.log(`${from}:EJECUTANDO`);
                this.workingOnPromise.set(from, true);
                this.processQueue(from);
            }
        })
    }

    /**
     * Ejecuta el proceso encolado
     * @param {*} from
     */
    async processQueue(from) {
        const queueByFrom = this.queue.get(from);

        while (queueByFrom.length > 0) {
            const tasksToProcess = queueByFrom.splice(0, this.concurrencyLimit);

            const promises = tasksToProcess.map(async (item) => {
                try {
                    const refToPromise = item.promiseFunc(item);
                    const value = await Promise.race([
                        refToPromise.timerPromise,
                        refToPromise.promiseInFunc().then(() => refToPromise.cancel()),
                    ]);
                    item.resolve(value);
                    this.logger.log(`${from}:SUCCESS`);
                } catch (err) {
                    this.logger.error(`${from}:ERROR: ${JSON.stringify(err)}`);
                    item.reject(err);
                }
                this.clearIdFromCallback(from, item.fingerIdRef);
            });

            await Promise.allSettled(promises);
        }

        this.workingOnPromise.set(from, false);
        await this.clearQueue(from);
    }

    /**
     * Limpia la cola de procesos
     * @param {*} from
     */
    async clearQueue(from) {
        if (this.queue.has(from)) {
            const queueByFrom = this.queue.get(from);
            const workingByFrom = this.workingOnPromise.get(from);

            // Marca todas las promesas como canceladas
            queueByFrom.forEach((item) => {
                item.cancelled = true;
                item.reject('Queue cleared');
            });

            // Limpia la cola

            this.queue.set(from, []);

            // Si hay un proceso en ejecución, también deberías cancelarlo
            if (workingByFrom) {
                this.workingOnPromise.set(from, false);
            }
        }
    }

    /**
     * Establecer una marca de tiempo de ejecuccion de promeses
     * esto evita resolver promesas que yo no necesita
     * @param {*} from
     * @param {*} fingerTime
     */
    setFingerTime = (from, fingerTime) => {
        this.queueTime.set(from, fingerTime);
    }

    setIdsCallbacks = (from, ids = []) => {
        this.idsCallbacks.set(from, ids);
    }

    getIdsCallbacs = (from) => {
        if (this.idsCallbacks.has(from)) {
            return this.idsCallbacks.get(from)
        } else {
            return []
        }
    }

    clearIdFromCallback = (from, id) => {
        if (this.idsCallbacks.has(from)) {
            const ids = this.idsCallbacks.get(from);
            const index = ids.indexOf(id);

            if (index !== -1) {
                ids.splice(index, 1);
            }
        }
    }
};

var queue = Queue$1;

const { generateRef: generateRef$6 } = hash;

const eventDocument$1 = () => {
    return generateRef$6('_event_document_')
};

const REGEX_EVENT_DOCUMENT$1 = /^_event_document__[\w\d]{8}-(?:[\w\d]{4}-){3}[\w\d]{12}$/;

var eventDocument_1 = { eventDocument: eventDocument$1, REGEX_EVENT_DOCUMENT: REGEX_EVENT_DOCUMENT$1 };

const { generateRef: generateRef$5 } = hash;

const eventLocation$1 = () => {
    return generateRef$5('_event_location_')
};

const REGEX_EVENT_LOCATION$1 = /^_event_location__[\w\d]{8}-(?:[\w\d]{4}-){3}[\w\d]{12}$/;

var eventLocation_1 = { eventLocation: eventLocation$1, REGEX_EVENT_LOCATION: REGEX_EVENT_LOCATION$1 };

const { generateRef: generateRef$4 } = hash;

const eventMedia$1 = () => {
    return generateRef$4('_event_media_')
};

const REGEX_EVENT_MEDIA$1 = /^_event_media__[\w\d]{8}-(?:[\w\d]{4}-){3}[\w\d]{12}$/;

var eventMedia_1 = { eventMedia: eventMedia$1, REGEX_EVENT_MEDIA: REGEX_EVENT_MEDIA$1 };

const { generateRef: generateRef$3 } = hash;

const eventVoiceNote$1 = () => {
    return generateRef$3('_event_voice_note_')
};

const REGEX_EVENT_VOICE_NOTE$1 = /^_event_voice_note__[\w\d]{8}-(?:[\w\d]{4}-){3}[\w\d]{12}$/;

var eventVoiceNote_1 = { eventVoiceNote: eventVoiceNote$1, REGEX_EVENT_VOICE_NOTE: REGEX_EVENT_VOICE_NOTE$1 };

const { generateRef: generateRef$2 } = hash;

const eventOrder$1 = () => {
    return generateRef$2('_event_order_')
};

const REGEX_EVENT_ORDER$1 = /^_event_order__[\w\d]{8}-(?:[\w\d]{4}-){3}[\w\d]{12}$/;

var eventOrder_1 = { eventOrder: eventOrder$1, REGEX_EVENT_ORDER: REGEX_EVENT_ORDER$1 };

const { generateRef: generateRef$1 } = hash;

const eventWelcome$1 = () => {
    return generateRef$1('_event_welcome_')
};

var eventWelcome_1 = { eventWelcome: eventWelcome$1 };

const { generateRef } = hash;

const eventAction$1 = () => {
    return generateRef('_event_action_')
};

var eventAction_1 = { eventAction: eventAction$1 };

const { eventDocument, REGEX_EVENT_DOCUMENT } = eventDocument_1;
const { eventLocation, REGEX_EVENT_LOCATION } = eventLocation_1;
const { eventMedia, REGEX_EVENT_MEDIA } = eventMedia_1;
const { eventVoiceNote, REGEX_EVENT_VOICE_NOTE } = eventVoiceNote_1;
const { eventOrder,REGEX_EVENT_ORDER } = eventOrder_1;
const { eventWelcome } = eventWelcome_1;
const { eventAction } = eventAction_1;


const LIST_ALL = {
    WELCOME: eventWelcome(),
    MEDIA: eventMedia(),
    LOCATION: eventLocation(),
    DOCUMENT: eventDocument(),
    VOICE_NOTE: eventVoiceNote(),
    ACTION: eventAction(),
    ORDER: eventOrder(),
};

const LIST_REGEX$1 = {
    REGEX_EVENT_DOCUMENT,
    REGEX_EVENT_LOCATION,
    REGEX_EVENT_MEDIA,
    REGEX_EVENT_VOICE_NOTE,
    REGEX_EVENT_ORDER,
};

var events = { LIST_ALL, LIST_REGEX: LIST_REGEX$1 };

let SingleState$1 = class SingleState {
    STATE = new Map()
    constructor() {}

    /**
     *
     * @param {*} ctx
     * @returns
     */
    updateState = (ctx = {}) => {
        return (keyValue) => {
            return new Promise((resolve) => {
                const currentStateByFrom = this.STATE.get(ctx.from);
                const updatedState = { ...currentStateByFrom, ...keyValue };
                this.STATE.set(ctx.from, updatedState);
                resolve();
            })
        }
    }

    /**
     *
     * @returns
     */
    getMyState = (from) => {
        return () => this.STATE.get(from)
    }

    /**
     *
     * @param {*} prop
     * @returns
     */
    get = (from) => {
        return (prop) => this.STATE.get(from)[prop]
    }

    /**
     *
     * @returns
     */
    getAllState = () => this.STATE.values()

    /**
     *
     * @param {*} from
     * @returns
     */
    clear = (from) => {
        return () => this.STATE.delete(from)
    }
};

var state_class = SingleState$1;

let GlobalState$1 = class GlobalState {
    STATE = new Map()
    RAW = {}
    constructor() { }

    /**
     *
     * @param {*} ctx
     * @returns
     */
    updateState = () => {
        const currentStateByFrom = this.STATE.get('__global__');
        return (keyValue) => this.STATE.set('__global__', { ...currentStateByFrom, ...keyValue })
    }

    /**
     *
     * @returns
     */
    getMyState = () => {
        return () => this.STATE.get('__global__')
    }

    get = () => {
        return (prop) => this.STATE.get('__global__')[prop]
    }
    /**
     *
     * @returns
     */
    getAllState = () => this.STATE.values()

    /**
     *
     * @param {*} from
     * @returns
     */
    clear = () => {
        return () => this.STATE.delete('__global__')
    }
};

var globalState_class = GlobalState$1;

let IdleState$1 = class IdleState {
    index = new Map()
    indexInterval = new Map()
    indexEnd = new Map()

    setIdleTime = (inRef, timeInSeconds) => {
        this.stop(inRef);
        const currentTime = new Date().getTime();
        const endTime = currentTime + timeInSeconds * 1000;
        if (!this.index.has(inRef)) this.index.set(inRef, timeInSeconds);
        if (!this.indexInterval.has(inRef)) this.indexInterval.set(inRef, null);
        if (!this.indexEnd.has(inRef)) this.indexEnd.set(inRef, endTime);
    }

    start = (inRef, cb = () => null) => {
        const refTimer = this.index.get(inRef) ?? undefined;
        if (refTimer) {
            const interval = setInterval(() => {
                const currentTime = new Date().getTime();
                const endTime = this.indexEnd.get(inRef);
                if (currentTime > endTime) {
                    this.stop(inRef);
                    cb();
                }
            }, 1000);

            this.indexInterval.set(inRef, interval);
        }
    }

    stop = (inRef) => {
        try {
            clearInterval(this.indexInterval.get(inRef));
            this.index.delete(inRef);
            this.indexInterval.delete(inRef);
            this.indexEnd.delete(inRef);
        } catch (err) {
            return null
        }
    }
};

var idleState_class = IdleState$1;

const { EventEmitter: EventEmitter$1 } = require$$0$2;
const { toCtx } = methods;
const { printer } = interactive;
const { delay: delay$1 } = delay_1;
const { Console } = require$$4;
const { createWriteStream } = require$$5;
const Queue = queue;

const { LIST_REGEX } = events;
const SingleState = state_class;
const GlobalState = globalState_class;
const { generateTime } = hash;
const IdleState = idleState_class;

const logger = new Console({
    stdout: createWriteStream(`${process.cwd()}/core.class.log`),
});
const loggerQueue = new Console({
    stdout: createWriteStream(`${process.cwd()}/queue.class.log`),
});

const idleForCallback = new IdleState();

/**
 * [ ] Escuchar eventos del provider asegurarte que los provider emitan eventos
 * [ ] Guardar historial en db
 * [ ] Buscar mensaje en flow
 *
 */
let CoreClass$1 = class CoreClass extends EventEmitter$1 {
    flowClass
    databaseClass
    providerClass
    queuePrincipal
    stateHandler = new SingleState()
    globalStateHandler = new GlobalState()
    generalArgs = {
        blackList: [],
        listEvents: {},
        delay: 0,
        globalState: {},
        extensions: undefined,
        queue: {
            timeout: 20000,
            concurrencyLimit: 15,
        },
    }
    constructor(_flow, _database, _provider, _args) {
        super();
        this.flowClass = _flow;
        this.databaseClass = _database;
        this.providerClass = _provider;
        this.generalArgs = { ...this.generalArgs, ..._args };

        this.queuePrincipal = new Queue(
            loggerQueue,
            this.generalArgs.queue.concurrencyLimit,
            this.generalArgs.queue.timeout
        );

        this.globalStateHandler.updateState()(this.generalArgs.globalState);

        if (this.generalArgs.extensions) this.globalStateHandler.RAW = this.generalArgs.extensions;

        for (const { event, func } of this.listenerBusEvents()) {
            this.providerClass.on(event, func);
        }
    }

    /**
     * Manejador de eventos
     */
    listenerBusEvents = () => [
        {
            event: 'preinit',
            func: () => printer('Iniciando proveedor, espere...'),
        },
        {
            event: 'require_action',
            func: ({ instructions, title = '⚡⚡ ACCIÓN REQUERIDA ⚡⚡' }) => printer(instructions, title),
        },
        {
            event: 'ready',
            func: () => printer('Proveedor conectado y listo'),
        },
        {
            event: 'auth_failure',
            func: ({ instructions }) => printer(instructions, '⚡⚡ ERROR AUTH ⚡⚡'),
        },
        {
            event: 'message',
            func: (msg) => this.handleMsg(msg),
        },
        {
            event: 'notice',
            func: (note) => printer(note),
        },
    ]

    /**
     * GLOSSARY.md
     * @param {*} messageCtxInComming
     * @returns
     */
    handleMsg = async (messageCtxInComming) => {
        logger.log(`[handleMsg]: `, messageCtxInComming);
        const { body, from } = messageCtxInComming;
        let msgToSend = [];
        let endFlowFlag = false;
        let fallBackFlag = false;
        if (this.generalArgs.blackList.includes(from)) return
        if (!body) return

        let prevMsg = await this.databaseClass.getPrevByNumber(from);
        const refToContinue = this.flowClass.findBySerialize(prevMsg?.refSerialize);

        if (prevMsg?.ref) {
            delete prevMsg._id;
            const ctxByNumber = toCtx({
                body,
                from,
                prevRef: prevMsg.refSerialize,
            });
            await this.databaseClass.save(ctxByNumber);
        }

        // 📄 Mantener estado de conversacion por numero
        const state = {
            getMyState: this.stateHandler.getMyState(messageCtxInComming.from),
            get: this.stateHandler.get(messageCtxInComming.from),
            getAllState: this.stateHandler.getAllState,
            update: this.stateHandler.updateState(messageCtxInComming),
            clear: this.stateHandler.clear(messageCtxInComming.from),
        };

        // 📄 Mantener estado global
        const globalState = {
            getMyState: this.globalStateHandler.getMyState(),
            get: this.globalStateHandler.get(),
            getAllState: this.globalStateHandler.getAllState,
            update: this.globalStateHandler.updateState(messageCtxInComming),
            clear: this.globalStateHandler.clear(),
        };

        const extensions = this.globalStateHandler.RAW;

        // 📄 Crar CTX de mensaje (uso private)
        const createCtxMessage = (payload = {}, index = 0) => {
            const body = typeof payload === 'string' ? payload : payload?.body ?? payload?.answer;
            const media = payload?.media ?? null;
            const buttons = payload?.buttons ?? [];
            const capture = payload?.capture ?? false;
            const delay = payload?.delay ?? 0;

            return toCtx({
                body,
                from,
                keyword: null,
                index,
                options: { media, buttons, capture, delay },
            })
        };

        // 📄 Limpiar cola de procesos
        const clearQueue = () => {
            this.queuePrincipal.clearQueue(from);
            return
        };

        // 📄 Finalizar flujo
        const endFlow =
            (flag) =>
            async (message = null) => {
                flag.endFlow = true;
                endFlowFlag = true;
                if (message) this.sendProviderAndSave(from, createCtxMessage(message));
                clearQueue();
                return
            };

        // 📄 Esta funcion se encarga de enviar un array de mensajes dentro de este ctx
        const sendFlow = async (messageToSend, numberOrId, options = {}) => {
            options = { prev: prevMsg, forceQueue: false, ...options };

            if (options.prev?.options?.capture) {
                await cbEveryCtx(options.prev?.ref);
            }

            for (const ctxMessage of messageToSend) {
                if (endFlowFlag) {
                    return // Si endFlowFlag es verdadero, detener el flujo
                }

                const delayMs = ctxMessage?.options?.delay ?? this.generalArgs.delay ?? 0;
                if (delayMs) {
                    await delay$1(delayMs); // Esperar según el retraso configurado
                }

                //TODO el proceso de forzar cola de procsos
                if (options?.forceQueue) {
                    const listIdsRefCallbacks = messageToSend.map((i) => i.ref);

                    const listProcessWait = this.queuePrincipal.getIdsCallbacs(from);
                    if (!listProcessWait.length) {
                        this.queuePrincipal.setIdsCallbacks(from, listIdsRefCallbacks);
                    } else {
                        const lastMessage = messageToSend[messageToSend.length - 1];
                        await this.databaseClass.save({ ...lastMessage, from: numberOrId });
                        if (listProcessWait.includes(lastMessage.ref)) {
                            this.queuePrincipal.clearQueue(from);
                        }
                    }
                }

                try {
                    await this.queuePrincipal.enqueue(
                        from,
                        async () => {
                            // Usar async en la función pasada a enqueue
                            await this.sendProviderAndSave(numberOrId, ctxMessage);
                            logger.log(`[QUEUE_SE_ENVIO]: `, ctxMessage);
                            await resolveCbEveryCtx(ctxMessage);
                        },
                        ctxMessage.ref
                    );
                } catch (error) {
                    logger.error(`Error al encolar (ID ${ctxMessage.ref}):`, error);
                    return Promise.reject
                    // Puedes considerar manejar el error aquí o rechazar la promesa
                    // Pasada a resolveCbEveryCtx con el error correspondiente.
                }
            }
        };

        const continueFlow = async () => {
            const currentPrev = await this.databaseClass.getPrevByNumber(from);
            const nextFlow = (await this.flowClass.find(refToContinue?.ref, true)) ?? [];
            const filterNextFlow = nextFlow.filter((msg) => msg.refSerialize !== currentPrev?.refSerialize);
            const isContinueFlow = filterNextFlow.map((i) => i.keyword).includes(currentPrev?.ref);

            if (!isContinueFlow) {
                const refToContinueChild = this.flowClass.getRefToContinueChild(currentPrev?.keyword);
                const flowStandaloneChild = this.flowClass.getFlowsChild();
                const nextChildMessages =
                    (await this.flowClass.find(refToContinueChild?.ref, true, flowStandaloneChild)) || [];
                if (nextChildMessages?.length)
                    return exportFunctionsSend(() => sendFlow(nextChildMessages, from, { prev: undefined }))

                return exportFunctionsSend(() => sendFlow(filterNextFlow, from, { prev: undefined }))
            }
        };
        // 📄 [options: fallBack]: esta funcion se encarga de repetir el ultimo mensaje
        const fallBack =
            (flag) =>
            async (message = null) => {
                this.queuePrincipal.clearQueue(from);
                flag.fallBack = true;
                await this.sendProviderAndSave(from, {
                    ...prevMsg,
                    answer: typeof message === 'string' ? message : message?.body ?? prevMsg.answer,
                    options: {
                        ...prevMsg.options,
                        buttons: prevMsg.options?.buttons,
                    },
                });
                return
            };

        const gotoFlow =
            (flag) =>
            async (flowInstance, step = 0) => {
                flag.gotoFlow = true;
                const flowTree = flowInstance.toJson();
                const flowParentId = flowTree[step];
                const parseListMsg = await this.flowClass.find(flowParentId?.ref, true, flowTree);
                if (endFlowFlag) return
                for (const msg of parseListMsg) {
                    const msgParse = this.flowClass.findSerializeByRef(msg?.ref);
                    const ctxMessage = { ...msgParse, ...msg };
                    await this.sendProviderAndSave(from, ctxMessage).then(() => resolveCbEveryCtx(ctxMessage));
                }
                await endFlow(flag)();
                return
            };

        // 📄 [options: flowDynamic]: esta funcion se encarga de responder un array de respuesta esta limitado a 5 mensajes
        // para evitar bloque de whatsapp

        const flowDynamic =
            (flag) =>
            async (listMsg = [], options = { continue: true }) => {
                if (!options.hasOwnProperty('continue')) options = { ...options, continue: true };

                flag.flowDynamic = true;
                if (!Array.isArray(listMsg)) listMsg = [{ body: listMsg, ...options }];
                const parseListMsg = listMsg.map((opt, index) => createCtxMessage(opt, index));

                if (endFlowFlag) return
                this.queuePrincipal.setFingerTime(from, generateTime()); //aqui debeo decirle al sistema como que finalizo el flujo
                for (const msg of parseListMsg) {
                    const delayMs = msg?.options?.delay ?? this.generalArgs.delay ?? 0;
                    if (delayMs) await delay$1(delayMs);
                    await this.sendProviderAndSave(from, msg);
                }

                if (options?.continue) await continueFlow(generateTime());
                return
            };

        // 📄 Se encarga de revisar si el contexto del mensaje tiene callback o idle
        const resolveCbEveryCtx = async (ctxMessage) => {
            if (!!ctxMessage?.options?.idle && !ctxMessage?.options?.capture) {
                printer(
                    `[ATENCION IDLE]: La función "idle" no tendrá efecto a menos que habilites la opción "capture:true". Por favor, asegúrate de configurar "capture:true" o elimina la función "idle"`
                );
            }
            if (ctxMessage?.options?.idle) return await cbEveryCtx(ctxMessage?.ref, ctxMessage?.options?.idle)
            if (!ctxMessage?.options?.capture) return await cbEveryCtx(ctxMessage?.ref)
        };

        // 📄 Se encarga de revisar si el contexto del mensaje tiene callback y ejecutarlo
        const cbEveryCtx = async (inRef, startIdleMs = 0) => {
            let flags = {
                endFlow: false,
                fallBack: false,
                flowDynamic: false,
                gotoFlow: false,
            };

            const provider = this.providerClass;
            const database = this.databaseClass;

            if (!this.flowClass.allCallbacks[inRef]) return Promise.resolve()
            const argsCb = {
                database,
                provider,
                state,
                globalState,
                extensions,
                idle: idleForCallback,
                inRef,
                fallBack: fallBack(flags),
                flowDynamic: flowDynamic(flags),
                endFlow: endFlow(flags),
                gotoFlow: gotoFlow(flags),
            };

            idleForCallback.stop(inRef);
            const runContext = async (continueAfterIdle = true, overCtx = {}) => {
                messageCtxInComming = { ...messageCtxInComming, ...overCtx };
                await this.flowClass.allCallbacks[inRef](messageCtxInComming, argsCb);
                //Si no hay llamado de fallaback y no hay llamado de flowDynamic y no hay llamado de enflow EL flujo continua
                const ifContinue = !flags.endFlow && !flags.fallBack && !flags.flowDynamic;
                if (ifContinue && continueAfterIdle) await continueFlow(prevMsg?.options?.nested?.length);
            };

            if (startIdleMs > 0) {
                idleForCallback.setIdleTime(inRef, startIdleMs / 1000);
                idleForCallback.start(inRef, async () => {
                    await runContext(false, { idleFallBack: !!startIdleMs, from: null, body: null });
                });
                return
            }

            await runContext();
            return
        };

        const exportFunctionsSend = async (cb = () => Promise.resolve()) => {
            await cb();
            return {
                createCtxMessage,
                clearQueue,
                endFlow,
                sendFlow,
                continueFlow,
                fallBack,
                gotoFlow,
                flowDynamic,
                resolveCbEveryCtx,
                cbEveryCtx,
            }
        };

        // 📄🤘(tiene return) [options: nested(array)]: Si se tiene flujos hijos los implementa
        if (!endFlowFlag && prevMsg?.options?.nested?.length) {
            const nestedRef = prevMsg.options.nested;
            const flowStandalone = nestedRef.map((f) => ({
                ...nestedRef.find((r) => r.refSerialize === f.refSerialize),
            }));

            msgToSend = this.flowClass.find(body, false, flowStandalone) || [];

            return exportFunctionsSend(() => sendFlow(msgToSend, from))
        }

        // 📄🤘(tiene return) Si el mensaje previo implementa capture
        if (!endFlowFlag && !prevMsg?.options?.nested?.length) {
            const typeCapture = typeof prevMsg?.options?.capture;

            if (typeCapture === 'boolean' && fallBackFlag) {
                msgToSend = this.flowClass.find(refToContinue?.ref, true) || [];
                return exportFunctionsSend(() => sendFlow(msgToSend, from, { forceQueue: true }))
            }
        }

        msgToSend = this.flowClass.find(body) || [];

        if (msgToSend.length) {
            return exportFunctionsSend(() => sendFlow(msgToSend, from))
        }

        if (!prevMsg?.options?.capture) {
            msgToSend = this.flowClass.find(this.generalArgs.listEvents.WELCOME) || [];

            if (LIST_REGEX.REGEX_EVENT_LOCATION.test(body)) {
                msgToSend = this.flowClass.find(this.generalArgs.listEvents.LOCATION) || [];
            }

            if (LIST_REGEX.REGEX_EVENT_MEDIA.test(body)) {
                msgToSend = this.flowClass.find(this.generalArgs.listEvents.MEDIA) || [];
            }

            if (LIST_REGEX.REGEX_EVENT_DOCUMENT.test(body)) {
                msgToSend = this.flowClass.find(this.generalArgs.listEvents.DOCUMENT) || [];
            }

            if (LIST_REGEX.REGEX_EVENT_VOICE_NOTE.test(body)) {
                msgToSend = this.flowClass.find(this.generalArgs.listEvents.VOICE_NOTE) || [];
            }
        }
        return exportFunctionsSend(() => sendFlow(msgToSend, from, { forceQueue: true }))
    }

    /**
     * Enviar mensaje con contexto atraves del proveedor de whatsapp
     * @param {*} numberOrId
     * @param {*} ctxMessage ver más en GLOSSARY.md
     * @returns
     */
    sendProviderAndSave = async (numberOrId, ctxMessage) => {
        try {
            const { answer } = ctxMessage;
            if (answer && answer.length && answer !== '__call_action__') {
                if (answer !== '__capture_only_intended__') {
                    await this.providerClass.sendMessage(numberOrId, answer, ctxMessage);
                    this.emit('send_message', { numberOrId, answer, ctxMessage });
                }
            }
            await this.databaseClass.save({ ...ctxMessage, from: numberOrId });

            return Promise.resolve
        } catch (err) {
            logger.log(`[ERROR ID (${ctxMessage.ref})]: `, err);
            return Promise.reject
        }
    }

    /**
     * @deprecated
     * @private
     * @param {*} message
     * @param {*} ref
     */
    continue = (message, ref = false) => {
        const responde = this.flowClass.find(message, ref);
        if (responde) {
            this.providerClass.sendMessage(responde.answer);
            this.databaseClass.saveLog(responde.answer);
            this.continue(null, responde.ref);
        }
    }

    /**
     * Funcion dedicada a enviar el mensaje sin pasar por el flow
     * (dialogflow)
     * @param {*} messageToSend
     * @param {*} numberOrId
     * @returns
     */
    sendFlowSimple = async (messageToSend, numberOrId) => {
        for (const ctxMessage of messageToSend) {
            const delayMs = ctxMessage?.options?.delay ?? this.generalArgs.delay ?? 0;
            if (delayMs) await delay$1(delayMs);
            await this.queuePrincipal.enqueue(
                numberOrId,
                () => this.sendProviderAndSave(numberOrId, ctxMessage),
                ctxMessage.ref
            );
            // await queuePromises.dequeue()
        }
        return Promise.resolve
    }
};
var core_class = CoreClass$1;

const { EventEmitter } = require$$0$2;
/**
 * Esta clase debe siempre proporcionar los siguietes metodos
 * sendMessage = Para enviar un mensaje
 *
 * @important
 * Esta clase extiende de la clase del provider OJO
 * Eventos
 *  - message
 *  - ready
 *  - error
 *  - require_action
 */

const NODE_ENV = process.env.NODE_ENV || 'dev';
let ProviderClass$2 = class ProviderClass extends EventEmitter {
    /**
     * events: message | auth | auth_error | ...
     *
     */

    sendMessage = async (userId, message) => {
        if (NODE_ENV !== 'production') console.log('[sendMessage]', { userId, message });
        return message
    }

    getInstance = () => this.vendor
};

var provider_class = ProviderClass$2;

const { toSerialize: toSerialize$1 } = toSerialize_1;
const { flatObject } = flattener;

let FlowClass$1 = class FlowClass {
    allCallbacks = []
    flowSerialize = []
    flowRaw = []
    constructor(_flow) {
        if (!Array.isArray(_flow)) throw new Error('Esto debe ser un ARRAY')
        this.flowRaw = _flow;

        this.allCallbacks = flatObject(_flow);

        const mergeToJsonSerialize = Object.keys(_flow)
            .map((indexObjectFlow) => _flow[indexObjectFlow].toJson())
            .flat(2);

        this.flowSerialize = toSerialize$1(mergeToJsonSerialize);
    }

    find = (keyOrWord, symbol = false, overFlow = null) => {
        keyOrWord = `${keyOrWord}`;
        let capture = false;
        let messages = [];
        let refSymbol = null;
        overFlow = overFlow ?? this.flowSerialize;

        const mapSensitive = (str, mapOptions = { sensitive: false, regex: false }) => {
            if (mapOptions.regex) return new Function(`return ${str}`)()
            const regexSensitive = mapOptions.sensitive ? 'g' : 'i';

            if (Array.isArray(str)) {
                const patterns = mapOptions.sensitive ? str.map((item) => `\\b${item}\\b`) : str;
                return new RegExp(patterns.join('|'), regexSensitive)
            }
            const pattern = mapOptions.sensitive ? `\\b${str}\\b` : str;
            return new RegExp(pattern, regexSensitive)
        };

        const findIn = (keyOrWord, symbol = false, flow = overFlow) => {
            capture = refSymbol?.options?.capture || false;
            if (capture) return messages

            if (symbol) {
                refSymbol = flow.find((c) => c.keyword === keyOrWord);
                if (refSymbol?.answer) messages.push(refSymbol);
                if (refSymbol?.ref) findIn(refSymbol.ref, true);
            } else {
                refSymbol = flow.find((c) => {
                    const sensitive = c?.options?.sensitive || false;
                    const regex = c?.options?.regex || false;
                    return mapSensitive(c.keyword, { sensitive, regex }).test(keyOrWord)
                });
                if (refSymbol?.ref) findIn(refSymbol.ref, true);
                return messages
            }
        };
        findIn(keyOrWord, symbol);
        return messages
    }

    findBySerialize = (refSerialize) => this.flowSerialize.find((r) => r.refSerialize === refSerialize)

    findIndexByRef = (ref) => this.flowSerialize.findIndex((r) => r.ref === ref)

    findSerializeByRef = (ref) => this.flowSerialize.find((r) => r.ref === ref)

    findSerializeByKeyword = (keyword) => this.flowSerialize.find((r) => r.keyword === keyword)

    getRefToContinueChild = (keyword) => {
        try {
            const flowChilds = this.flowSerialize
                .reduce((acc, cur) => {
                    const merge = [...acc, cur?.options?.nested].flat(2);
                    return merge
                }, [])
                .filter((i) => !!i && i?.refSerialize === keyword)
                .shift();

            return flowChilds
        } catch (e) {
            return undefined
        }
    }

    getFlowsChild = () => {
        try {
            const flowChilds = this.flowSerialize
                .reduce((acc, cur) => {
                    const merge = [...acc, cur?.options?.nested].flat(2);
                    return merge
                }, [])
                .filter((i) => !!i);

            return flowChilds
        } catch (e) {
            return []
        }
    }
};

var flow_class = FlowClass$1;

const CoreClass = core_class;
const ProviderClass$1 = provider_class;
const FlowClass = flow_class;
const { addKeyword, addAnswer, addChild, toSerialize } = methods;
const { LIST_ALL: EVENTS } = events;

/**
 * Crear instancia de clase Bot
 * @param {*} args
 * @returns
 */
const createBot = async ({ flow, database, provider }, args = {}) =>
    new CoreClass(flow, database, provider, { ...args, listEvents: EVENTS });

/**
 * Crear instancia de clase Io (Flow)
 * @param {*} args
 * @returns
 */
const createFlow = (args) => {
    return new FlowClass(args)
};

/**
 * Crear instancia de clase Provider
 * Depdendiendo del Provider puedes pasar argumentos
 * Ver Documentacion
 * @param {*} args
 * @returns
 */
const createProvider = (providerClass = class {}, args = null) => {
    const providerInstance = new providerClass(args);
    if (!providerClass.prototype instanceof ProviderClass$1) throw new Error('El provider no implementa ProviderClass')
    return providerInstance
};

var bot = {
    createBot,
    createFlow,
    createProvider,
    addKeyword,
    addAnswer,
    addChild,
    toSerialize,
    ProviderClass: ProviderClass$1,
    CoreClass,
    EVENTS,
};

const { ProviderClass } = bot;

function delay(ms) {
    return new Promise((res) => setTimeout(res, ms))
}

class MockProvider extends ProviderClass {
    constructor() {
        super();
    }

    delaySendMessage = async (miliseconds, eventName, payload) => {
        await delay(miliseconds);
        this.emit(eventName, payload);
    }

    sendMessage = async (userId, message) => {
        return Promise.resolve({ userId, message })
    }
}

var mock = MockProvider;

module.exports = mock;
