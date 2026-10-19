import { describe, expect, it } from "vitest";
import { bugReportUrl } from "./issue-report";

describe("issue report", () => {
  it("opens the bug form with the environment prefilled", () => {
    const url = new URL(
      bugReportUrl({
        version: "1.1.0",
        platform: "darwin",
        systemVersion: "15.4.0",
        arch: "arm64",
      }),
    );
    expect(url.origin + url.pathname).toBe(
      "https://github.com/raphaelsalaja/pond/issues/new",
    );
    expect(url.searchParams.get("template")).toBe("bug_report.yml");
    expect(url.searchParams.get("environment")).toBe(
      "Pond: 1.1.0\nOS: macOS 15.4.0\nArchitecture: arm64",
    );
  });

  it("names Windows in the environment", () => {
    const url = new URL(
      bugReportUrl({
        version: "1.1.0",
        platform: "win32",
        systemVersion: "10.0.26100",
        arch: "x64",
      }),
    );
    expect(url.searchParams.get("environment")).toBe(
      "Pond: 1.1.0\nOS: Windows 10.0.26100\nArchitecture: x64",
    );
  });
});
