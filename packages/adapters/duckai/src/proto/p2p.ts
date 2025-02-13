/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const protobufPackage = 'p2p';

export interface ConnectRequest {
  port: number;
  name: string;
  privateKey: string;
}

export interface P2PEvent {
  ready?: ReadyEvent | undefined;
  peerConnected?: PeerConnectedEvent | undefined;
  error?: ErrorEvent | undefined;
  message?: MessageEvent | undefined;
}

export interface ReadyEvent {
  peerId: string;
}

export interface PeerConnectedEvent {
  peerId: string;
}

export interface ErrorEvent {
  code: string;
  message: string;
}

export interface MessageEvent {
  messageId: string;
  from: string;
  to: string;
  content: Uint8Array;
  timestamp: number;
}

export interface Message {
  to: string;
  content: Uint8Array;
}

export interface SendResult {
  messageId: string;
}

export interface StopRequest {}

export interface StopResponse {}

function createBaseConnectRequest(): ConnectRequest {
  return { port: 0, name: '', privateKey: '' };
}

export const ConnectRequest = {
  encode(
    message: ConnectRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.port !== 0) {
      writer.uint32(8).int32(message.port);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    if (message.privateKey !== '') {
      writer.uint32(26).string(message.privateKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.port = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.privateKey = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectRequest {
    return {
      port: isSet(object.port) ? globalThis.Number(object.port) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      privateKey: isSet(object.privateKey)
        ? globalThis.String(object.privateKey)
        : '',
    };
  },

  toJSON(message: ConnectRequest): unknown {
    const obj: any = {};
    if (message.port !== 0) {
      obj.port = Math.round(message.port);
    }
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.privateKey !== '') {
      obj.privateKey = message.privateKey;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectRequest>, I>>(
    base?: I
  ): ConnectRequest {
    return ConnectRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectRequest>, I>>(
    object: I
  ): ConnectRequest {
    const message = createBaseConnectRequest();
    message.port = object.port ?? 0;
    message.name = object.name ?? '';
    message.privateKey = object.privateKey ?? '';
    return message;
  },
};

function createBaseP2PEvent(): P2PEvent {
  return {
    ready: undefined,
    peerConnected: undefined,
    error: undefined,
    message: undefined,
  };
}

export const P2PEvent = {
  encode(
    message: P2PEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ready !== undefined) {
      ReadyEvent.encode(message.ready, writer.uint32(10).fork()).ldelim();
    }
    if (message.peerConnected !== undefined) {
      PeerConnectedEvent.encode(
        message.peerConnected,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.error !== undefined) {
      ErrorEvent.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    if (message.message !== undefined) {
      MessageEvent.encode(message.message, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): P2PEvent {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseP2PEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ready = ReadyEvent.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.peerConnected = PeerConnectedEvent.decode(
            reader,
            reader.uint32()
          );
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.error = ErrorEvent.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.message = MessageEvent.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): P2PEvent {
    return {
      ready: isSet(object.ready)
        ? ReadyEvent.fromJSON(object.ready)
        : undefined,
      peerConnected: isSet(object.peerConnected)
        ? PeerConnectedEvent.fromJSON(object.peerConnected)
        : undefined,
      error: isSet(object.error)
        ? ErrorEvent.fromJSON(object.error)
        : undefined,
      message: isSet(object.message)
        ? MessageEvent.fromJSON(object.message)
        : undefined,
    };
  },

  toJSON(message: P2PEvent): unknown {
    const obj: any = {};
    if (message.ready !== undefined) {
      obj.ready = ReadyEvent.toJSON(message.ready);
    }
    if (message.peerConnected !== undefined) {
      obj.peerConnected = PeerConnectedEvent.toJSON(message.peerConnected);
    }
    if (message.error !== undefined) {
      obj.error = ErrorEvent.toJSON(message.error);
    }
    if (message.message !== undefined) {
      obj.message = MessageEvent.toJSON(message.message);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<P2PEvent>, I>>(base?: I): P2PEvent {
    return P2PEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<P2PEvent>, I>>(object: I): P2PEvent {
    const message = createBaseP2PEvent();
    message.ready =
      object.ready !== undefined && object.ready !== null
        ? ReadyEvent.fromPartial(object.ready)
        : undefined;
    message.peerConnected =
      object.peerConnected !== undefined && object.peerConnected !== null
        ? PeerConnectedEvent.fromPartial(object.peerConnected)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? ErrorEvent.fromPartial(object.error)
        : undefined;
    message.message =
      object.message !== undefined && object.message !== null
        ? MessageEvent.fromPartial(object.message)
        : undefined;
    return message;
  },
};

function createBaseReadyEvent(): ReadyEvent {
  return { peerId: '' };
}

export const ReadyEvent = {
  encode(
    message: ReadyEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.peerId !== '') {
      writer.uint32(10).string(message.peerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadyEvent {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadyEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.peerId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReadyEvent {
    return {
      peerId: isSet(object.peerId) ? globalThis.String(object.peerId) : '',
    };
  },

  toJSON(message: ReadyEvent): unknown {
    const obj: any = {};
    if (message.peerId !== '') {
      obj.peerId = message.peerId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadyEvent>, I>>(base?: I): ReadyEvent {
    return ReadyEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReadyEvent>, I>>(
    object: I
  ): ReadyEvent {
    const message = createBaseReadyEvent();
    message.peerId = object.peerId ?? '';
    return message;
  },
};

function createBasePeerConnectedEvent(): PeerConnectedEvent {
  return { peerId: '' };
}

export const PeerConnectedEvent = {
  encode(
    message: PeerConnectedEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.peerId !== '') {
      writer.uint32(10).string(message.peerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PeerConnectedEvent {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeerConnectedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.peerId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PeerConnectedEvent {
    return {
      peerId: isSet(object.peerId) ? globalThis.String(object.peerId) : '',
    };
  },

  toJSON(message: PeerConnectedEvent): unknown {
    const obj: any = {};
    if (message.peerId !== '') {
      obj.peerId = message.peerId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PeerConnectedEvent>, I>>(
    base?: I
  ): PeerConnectedEvent {
    return PeerConnectedEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PeerConnectedEvent>, I>>(
    object: I
  ): PeerConnectedEvent {
    const message = createBasePeerConnectedEvent();
    message.peerId = object.peerId ?? '';
    return message;
  },
};

function createBaseErrorEvent(): ErrorEvent {
  return { code: '', message: '' };
}

export const ErrorEvent = {
  encode(
    message: ErrorEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.code !== '') {
      writer.uint32(10).string(message.code);
    }
    if (message.message !== '') {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ErrorEvent {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseErrorEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.code = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ErrorEvent {
    return {
      code: isSet(object.code) ? globalThis.String(object.code) : '',
      message: isSet(object.message) ? globalThis.String(object.message) : '',
    };
  },

  toJSON(message: ErrorEvent): unknown {
    const obj: any = {};
    if (message.code !== '') {
      obj.code = message.code;
    }
    if (message.message !== '') {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ErrorEvent>, I>>(base?: I): ErrorEvent {
    return ErrorEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ErrorEvent>, I>>(
    object: I
  ): ErrorEvent {
    const message = createBaseErrorEvent();
    message.code = object.code ?? '';
    message.message = object.message ?? '';
    return message;
  },
};

function createBaseMessageEvent(): MessageEvent {
  return {
    messageId: '',
    from: '',
    to: '',
    content: new Uint8Array(0),
    timestamp: 0,
  };
}

export const MessageEvent = {
  encode(
    message: MessageEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.messageId !== '') {
      writer.uint32(10).string(message.messageId);
    }
    if (message.from !== '') {
      writer.uint32(18).string(message.from);
    }
    if (message.to !== '') {
      writer.uint32(26).string(message.to);
    }
    if (message.content.length !== 0) {
      writer.uint32(34).bytes(message.content);
    }
    if (message.timestamp !== 0) {
      writer.uint32(40).int64(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageEvent {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messageId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.from = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.to = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.content = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.timestamp = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageEvent {
    return {
      messageId: isSet(object.messageId)
        ? globalThis.String(object.messageId)
        : '',
      from: isSet(object.from) ? globalThis.String(object.from) : '',
      to: isSet(object.to) ? globalThis.String(object.to) : '',
      content: isSet(object.content)
        ? bytesFromBase64(object.content)
        : new Uint8Array(0),
      timestamp: isSet(object.timestamp)
        ? globalThis.Number(object.timestamp)
        : 0,
    };
  },

  toJSON(message: MessageEvent): unknown {
    const obj: any = {};
    if (message.messageId !== '') {
      obj.messageId = message.messageId;
    }
    if (message.from !== '') {
      obj.from = message.from;
    }
    if (message.to !== '') {
      obj.to = message.to;
    }
    if (message.content.length !== 0) {
      obj.content = base64FromBytes(message.content);
    }
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageEvent>, I>>(
    base?: I
  ): MessageEvent {
    return MessageEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageEvent>, I>>(
    object: I
  ): MessageEvent {
    const message = createBaseMessageEvent();
    message.messageId = object.messageId ?? '';
    message.from = object.from ?? '';
    message.to = object.to ?? '';
    message.content = object.content ?? new Uint8Array(0);
    message.timestamp = object.timestamp ?? 0;
    return message;
  },
};

function createBaseMessage(): Message {
  return { to: '', content: new Uint8Array(0) };
}

export const Message = {
  encode(
    message: Message,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.to !== '') {
      writer.uint32(10).string(message.to);
    }
    if (message.content.length !== 0) {
      writer.uint32(18).bytes(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.to = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      to: isSet(object.to) ? globalThis.String(object.to) : '',
      content: isSet(object.content)
        ? bytesFromBase64(object.content)
        : new Uint8Array(0),
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    if (message.to !== '') {
      obj.to = message.to;
    }
    if (message.content.length !== 0) {
      obj.content = base64FromBytes(message.content);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Message>, I>>(base?: I): Message {
    return Message.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.to = object.to ?? '';
    message.content = object.content ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSendResult(): SendResult {
  return { messageId: '' };
}

export const SendResult = {
  encode(
    message: SendResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.messageId !== '') {
      writer.uint32(10).string(message.messageId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendResult {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.messageId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendResult {
    return {
      messageId: isSet(object.messageId)
        ? globalThis.String(object.messageId)
        : '',
    };
  },

  toJSON(message: SendResult): unknown {
    const obj: any = {};
    if (message.messageId !== '') {
      obj.messageId = message.messageId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendResult>, I>>(base?: I): SendResult {
    return SendResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendResult>, I>>(
    object: I
  ): SendResult {
    const message = createBaseSendResult();
    message.messageId = object.messageId ?? '';
    return message;
  },
};

function createBaseStopRequest(): StopRequest {
  return {};
}

export const StopRequest = {
  encode(_: StopRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): StopRequest {
    return {};
  },

  toJSON(_: StopRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StopRequest>, I>>(base?: I): StopRequest {
    return StopRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StopRequest>, I>>(_: I): StopRequest {
    const message = createBaseStopRequest();
    return message;
  },
};

function createBaseStopResponse(): StopResponse {
  return {};
}

export const StopResponse = {
  encode(
    _: StopResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): StopResponse {
    return {};
  },

  toJSON(_: StopResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<StopResponse>, I>>(
    base?: I
  ): StopResponse {
    return StopResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StopResponse>, I>>(
    _: I
  ): StopResponse {
    const message = createBaseStopResponse();
    return message;
  },
};

export interface P2PNode {
  /** Connect to the P2P network and receive events */
  Connect(request: ConnectRequest): Observable<P2PEvent>;
  /** Send a message to a peer */
  SendMessage(request: Message): Promise<SendResult>;
  /** Stop the P2P node */
  Stop(request: StopRequest): Promise<StopResponse>;
}

export const P2PNodeServiceName = 'p2p.P2PNode';
export class P2PNodeClientImpl implements P2PNode {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || P2PNodeServiceName;
    this.rpc = rpc;
    this.Connect = this.Connect.bind(this);
    this.SendMessage = this.SendMessage.bind(this);
    this.Stop = this.Stop.bind(this);
  }
  Connect(request: ConnectRequest): Observable<P2PEvent> {
    const data = ConnectRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      this.service,
      'Connect',
      data
    );
    return result.pipe(map((data) => P2PEvent.decode(_m0.Reader.create(data))));
  }

  SendMessage(request: Message): Promise<SendResult> {
    const data = Message.encode(request).finish();
    const promise = this.rpc.request(this.service, 'SendMessage', data);
    return promise.then((data) => SendResult.decode(_m0.Reader.create(data)));
  }

  Stop(request: StopRequest): Promise<StopResponse> {
    const data = StopRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, 'Stop', data);
    return promise.then((data) => StopResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
  clientStreamingRequest(
    service: string,
    method: string,
    data: Observable<Uint8Array>
  ): Promise<Uint8Array>;
  serverStreamingRequest(
    service: string,
    method: string,
    data: Uint8Array
  ): Observable<Uint8Array>;
  bidirectionalStreamingRequest(
    service: string,
    method: string,
    data: Observable<Uint8Array>
  ): Observable<Uint8Array>;
}

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, 'base64'));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString('base64');
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(''));
  }
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
    ? globalThis.Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
