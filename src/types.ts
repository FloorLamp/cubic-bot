import { Principal } from "@dfinity/principal";
import { Block, Event, Summary } from "./Cubic/Cubic.did";

export type Modify<T, R> = Omit<T, keyof R> & R;
export type MapType<T, A, B> = {
  [Key in keyof T]: T[Key] extends A
    ? B
    : T[Key] extends Record<any, any>
    ? MapType<T[Key], A, B>
    : T[Key];
};
export type ParsedSummary = {
  id: number;
  projectId: string;
  details: Summary["details"];
  status: Modify<Summary["status"], { offerValue: number }>;
  owner: Block | null;
  recentEvents: Event[];
};

export type Data = {
  now: string;
  data: ParsedSummary[];
};
export type JsonData = MapType<
  MapType<Data, Principal, string>,
  bigint,
  string
>;
