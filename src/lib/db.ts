import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export type TemplateType = "window" | "door" | "fascia" | "parapet" | "more";

export type TemplateRecord = {
  id: number;
  template_type: TemplateType;
  name: string;
  default_width: number;
  default_height: number;
  materials: string[];
  returns_in: number;
  hem_in: number;
  notes: string;
};

const dbPath =
  process.env.BENDPRO_DB_PATH ?? path.join(process.cwd(), "data", "bendpro.db");

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

function initDb() {
  db.pragma("journal_mode = WAL");
  db.exec(`
    create table if not exists templates (
      id integer primary key autoincrement,
      template_type text not null,
      name text not null,
      default_width real not null,
      default_height real not null,
      materials_json text not null,
      returns_in real not null,
      hem_in real not null,
      notes text not null
    );
  `);

  const count = db.prepare("select count(*) as count from templates").get() as {
    count: number;
  };

  if (count.count === 0) {
    const insert = db.prepare(`
      insert into templates
      (template_type, name, default_width, default_height, materials_json, returns_in, hem_in, notes)
      values (@template_type, @name, @default_width, @default_height, @materials_json, @returns_in, @hem_in, @notes)
    `);

    const seed: Omit<TemplateRecord, "id" | "materials"> & { materials_json: string }[] = [
      {
        template_type: "door",
        name: "Standard 8x7",
        default_width: 96,
        default_height: 84,
        materials_json: JSON.stringify(["Aluminum", "1 in Returns", "1/2 in Hem"]),
        returns_in: 1,
        hem_in: 0.5,
        notes: "Baseline residential garage door trim set.",
      },
      {
        template_type: "door",
        name: "Single 9x7",
        default_width: 108,
        default_height: 84,
        materials_json: JSON.stringify(["Aluminum", "1 in Returns", "1/2 in Hem"]),
        returns_in: 1,
        hem_in: 0.5,
        notes: "Common single-car garage door opening.",
      },
      {
        template_type: "door",
        name: "Double 16x7",
        default_width: 192,
        default_height: 84,
        materials_json: JSON.stringify(["Aluminum", "1 in Returns", "1/2 in Hem"]),
        returns_in: 1,
        hem_in: 0.5,
        notes: "Double-car garage door configuration.",
      },
      {
        template_type: "window",
        name: "Picture Window 4x3",
        default_width: 48,
        default_height: 36,
        materials_json: JSON.stringify(["Aluminum", "3/4 in Returns", "1/2 in Hem"]),
        returns_in: 0.75,
        hem_in: 0.5,
        notes: "Living room picture window opening.",
      },
      {
        template_type: "window",
        name: "Casement 3x4",
        default_width: 36,
        default_height: 48,
        materials_json: JSON.stringify(["Aluminum", "3/4 in Returns", "1/2 in Hem"]),
        returns_in: 0.75,
        hem_in: 0.5,
        notes: "Standard casement window trim.",
      },
      {
        template_type: "fascia",
        name: "Fascia 8 in",
        default_width: 96,
        default_height: 8,
        materials_json: JSON.stringify(["Aluminum", "1 in Returns", "1/2 in Hem"]),
        returns_in: 1,
        hem_in: 0.5,
        notes: "Standard fascia cover run.",
      },
      {
        template_type: "parapet",
        name: "Parapet Cap 10 in",
        default_width: 120,
        default_height: 10,
        materials_json: JSON.stringify(["Aluminum", "1 in Returns", "1/2 in Hem"]),
        returns_in: 1,
        hem_in: 0.5,
        notes: "Commercial parapet cap profile.",
      },
    ];

    const insertMany = db.transaction((rows) => {
      for (const row of rows) insert.run(row);
    });
    insertMany(seed);
  }
}

initDb();

export function getTemplates(templateType?: TemplateType): TemplateRecord[] {
  const rows = templateType
    ? db
        .prepare("select * from templates where template_type = ? order by id asc")
        .all(templateType)
    : db.prepare("select * from templates order by id asc").all();

  return (rows as any[]).map((row) => ({
    id: row.id,
    template_type: row.template_type,
    name: row.name,
    default_width: row.default_width,
    default_height: row.default_height,
    materials: JSON.parse(row.materials_json || "[]"),
    returns_in: row.returns_in,
    hem_in: row.hem_in,
    notes: row.notes,
  }));
}
