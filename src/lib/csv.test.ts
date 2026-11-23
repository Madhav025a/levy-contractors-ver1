import { expect, test } from "bun:test";
import { csvCell } from "./csv";
test("formula cells are neutralised", () => expect(csvCell("=HYPERLINK(1)")).toBe("'=HYPERLINK(1)"));
test("commas and quotes are escaped", () => expect(csvCell('a,"b"')).toBe('"a,""b"""'));
