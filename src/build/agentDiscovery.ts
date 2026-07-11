import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

const AGENT_SKILLS_SCHEMA = "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

export type AgentSkillManifestEntry = {
  name: string;
  type: "skill-md";
  description: string;
  url: string;
  digest: string;
};

/** Curated skills under `public/.well-known/agent-skills/<name>/SKILL.md`. */
export const AGENT_SKILL_DEFINITIONS: readonly {
  name: string;
  description: string;
}[] = [
  {
    name: "site-overview",
    description:
      "Orientation to Women's Health Duo: clinicians, primary routes, and pointers to llms.txt plus discovery files.",
  },
  {
    name: "book-consultation",
    description:
      "Telemedicine booking at /book-consultation: intake steps, consent, WhatsApp handoff, and policy boundaries.",
  },
  {
    name: "learn-hub",
    description:
      "Navigate the Learn hub: filtered carousel URLs, per-clip watch pages, articles index, and topical clusters.",
  },
];

function sha256Digest(filePath: string): string {
  const hash = createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
  return `sha256:${hash}`;
}

function agentSkillPublicDir(rootDir: string): string {
  return path.join(rootDir, "public", ".well-known", "agent-skills");
}

export function buildAgentSkillsIndex(siteUrl: string, rootDir: string): AgentSkillManifestEntry[] {
  const base = agentSkillPublicDir(rootDir);
  return AGENT_SKILL_DEFINITIONS.map(({ name, description }) => {
    const skillPath = path.join(base, name, "SKILL.md");
    if (!fs.existsSync(skillPath)) {
      throw new Error(`Missing agent skill file: ${skillPath}`);
    }
    const url = `${siteUrl}/.well-known/agent-skills/${name}/SKILL.md`;
    return {
      name,
      type: "skill-md" as const,
      description,
      url,
      digest: sha256Digest(skillPath),
    };
  });
}

export function writeAgentDiscoveryFiles(siteUrl: string, rootDir: string, outDir: string) {
  const skills = buildAgentSkillsIndex(siteUrl, rootDir);
  const wellKnownDir = path.join(outDir, ".well-known");
  const agentSkillsDir = path.join(wellKnownDir, "agent-skills");
  fs.mkdirSync(agentSkillsDir, { recursive: true });

  const index = {
    $schema: AGENT_SKILLS_SCHEMA,
    skills,
  };
  fs.writeFileSync(
    path.join(agentSkillsDir, "index.json"),
    `${JSON.stringify(index, null, 2)}\n`,
    "utf8",
  );

  const contentCatalog = {
    linkset: [
      {
        anchor: `${siteUrl}/`,
        item: [
          {
            href: `${siteUrl}/llms.txt`,
            rel: "describedby",
            type: "text/plain",
            title: "Machine-readable site overview for assistants",
          },
          {
            href: `${siteUrl}/.well-known/agent-skills/index.json`,
            rel: "service-doc",
            type: "application/json",
            title: "Agent skills discovery index",
          },
          {
            href: `${siteUrl}/learn/articles`,
            rel: "service-doc",
            type: "text/html",
            title: "Written topic guides index",
          },
          {
            href: `${siteUrl}/sitemap.xml`,
            rel: "sitemap",
            type: "application/xml",
            title: "Primary sitemap urlset",
          },
        ],
      },
    ],
  };
  fs.writeFileSync(
    path.join(wellKnownDir, "content-catalog.json"),
    `${JSON.stringify(contentCatalog, null, 2)}\n`,
    "utf8",
  );
}
