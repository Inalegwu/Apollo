import { Data } from "effect";

export class BonjourError extends Data.TaggedError("bonjour-error")<{
    cause: unknown;
}> {}
