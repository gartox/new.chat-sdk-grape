import { GetActionsPayload, GetMessagesPayload } from "../interfaces";

export class HyperionApi {
  readonly hyperion_url: string;
  readonly contract: string;
  readonly fetch: any;

  constructor(hyperion_url: string, contract: string, fetch: any) {
    this.hyperion_url = hyperion_url;
    this.contract = contract;
    this.fetch = fetch;
  }

  async getActions(payload: GetActionsPayload): Promise<any> {
    return await this.fetch(`${this.hyperion_url}/v2/history/get_actions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }

  async getDirectMessages(payload: GetMessagesPayload): Promise<any> {
    return await this.fetch(
      `${this.hyperion_url}/v2/history/get_actions?${this.queryParser(
        payload,
        this.contract,
        "senddm"
      )}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  async getChannelMessages(payload: GetMessagesPayload): Promise<any> {
    return await this.fetch(
      `${this.hyperion_url}/v2/history/get_actions?${this.queryParser(
        payload,
        this.contract,
        "sendchlmsg"
      )}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  async getChatMessages(payload: GetMessagesPayload): Promise<any> {
    return await this.fetch(
      `${this.hyperion_url}/v2/history/get_actions?${this.queryParser(
        payload,
        this.contract,
        "sendchtmsg"
      )}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  queryParser(payload: GetMessagesPayload, contract: string, method: string) {
    const propParser = (name: string, payload: any) =>
      payload !== undefined ? `${name}=${payload}&` : "";

    let query = Object.entries(payload).reduce((acc, element) => {
      return acc + propParser(element[0], element[1]);
    }, "");
    query = `filter=${contract}:${method}&` + query;

    return query;
  }
}
