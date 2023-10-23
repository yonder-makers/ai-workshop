import { Pipeline, pipeline } from "@xenova/transformers";

export class PipelineSingleton {
  private static instance?: Pipeline;
  private static readonly task = "token-classification";
  private static readonly model = "Xenova/bert-base-NER";

  static async getInstance(): Promise<Pipeline> {
    if (!this.instance) {
      this.instance = await pipeline(this.task, this.model);
    }
    return this.instance;
  }
}
