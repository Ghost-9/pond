const NEW_ISSUE_URL = "https://github.com/raphaelsalaja/pond/issues/new";

interface IssueEnvironment {
  version: string;
  platform: NodeJS.Platform;
  systemVersion: string;
  arch: string;
}

function osName(platform: NodeJS.Platform): string {
  if (platform === "darwin") return "macOS";
  if (platform === "win32") return "Windows";
  if (platform === "linux") return "Linux";
  return platform;
}

function formatIssueEnvironment(environment: IssueEnvironment): string {
  return [
    `Pond: ${environment.version}`,
    `OS: ${osName(environment.platform)} ${environment.systemVersion}`,
    `Architecture: ${environment.arch}`,
  ].join("\n");
}

/** GitHub issue forms prefill a field from the query parameter named after its `id`. */
export function bugReportUrl(environment: IssueEnvironment): string {
  const url = new URL(NEW_ISSUE_URL);
  url.searchParams.set("template", "bug_report.yml");
  url.searchParams.set("environment", formatIssueEnvironment(environment));
  return url.toString();
}
