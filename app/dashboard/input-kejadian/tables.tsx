// aop/dashboard/input-kejadian/tables.tsx

import { Input } from "@/components/ui/input";

import { UseFormReturn } from "react-hook-form";

import { FormValues } from "@/lib/schemas/kejadian-schema";

export function ManusiaTable({ form }: { form: UseFormReturn<FormValues> }) {
  const korban = [
    "Meninggal",
    "Hilang",
    "Luka/sakit",
    "Terdampak",
    "Mengungsi",
  ];
  const umur = ["Anak-anak", "Dewasa", "Lansia", "Total"];
  const kel = ["L", "P"];

  return (
    <table className="w-full text-sm border">
      <thead className="bg-muted">
        <tr>
          <th rowSpan={2} className="p-2 border">
            Korban
          </th>
          {umur.map((u) => (
            <th key={u} colSpan={2} className="p-2 border">
              {u}
            </th>
          ))}
        </tr>
        <tr>
          {umur.map((u) =>
            kel.map((k) => (
              <th key={u + k} className="p-2 border">
                {k}
              </th>
            ))
          )}
        </tr>
      </thead>
      <tbody>
        {korban.map((label) => {
          const names =
            label === "Meninggal"
              ? ["aml", "amp", "dwsml", "dwsmp", "lnml", "lnmp", "tml", "tmp"]
              : label === "Hilang"
              ? ["ahl", "ahp", "dwshl", "dwshp", "lnhl", "lnhp", "thl", "thp"]
              : label === "Luka/sakit"
              ? ["alkl", "alkp", "dwsll", "dwslp", "lnll", "lnlp", "tll", "tlp"]
              : label === "Terdampak"
              ? ["atl", "atp", "dwstl", "dwstp", "lntl", "lntp", "ttl", "ttp"]
              : ["aul", "aup", "dwsul", "dwsup", "lnul", "lnup", "tul", "tup"];
          return (
            <tr key={label}>
              <td className="p-2 border font-semibold">{label}</td>
              {names.map((n) => (
                <td key={n} className="p-2 border">
                  <Input
                    type="number"
                    {...form.register(n as any)}
                    className="w-full"
                  />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function RusakPertanianTable({
  form,
}: {
  form: UseFormReturn<FormValues>;
}) {
  const arr = ["Sawah", "Lahan", "Kebun", "Hutan", "Kolam"];
  return (
    <table className="w-full text-sm border">
      <thead className="bg-muted">
        <tr>
          <th className="p-2 border">Kerusakan</th>
          <th className="p-2 border">Ha</th>
          <th className="p-2 border">Taksiran Kerugian</th>
        </tr>
      </thead>
      <tbody>
        {arr.map((label) => (
          <tr key={label}>
            <td className="p-2 border font-semibold">{label}</td>
            <td className="p-2 border">
              <Input
                type="number"
                {...form.register(label.toLowerCase() as any)}
                className="w-full"
              />
            </td>
            <td className="p-2 border">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  {...form.register(`tx${label.toLowerCase()}` as any)}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">Juta</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function RusakKiosPabrikTable({
  form,
}: {
  form: UseFormReturn<FormValues>;
}) {
  const data = [
    { label: "Kios/Toko", rows: ["kb", "ks", "kr", "ktrd"], tx: "txkios" },
    { label: "Pabrik", rows: ["pb", "ps", "pr", "ptrd"], tx: "txpabrik" },
  ];
  return (
    <table className="w-full text-sm border">
      <thead className="bg-muted">
        <tr>
          <th className="p-2 border">Kerusakan</th>
          <th className="p-2 border">RB</th>
          <th className="p-2 border">RS</th>
          <th className="p-2 border">RR</th>
          <th className="p-2 border">Terendam</th>
          <th className="p-2 border">Taksiran Kerugian</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ label, rows, tx }) => (
          <tr key={label}>
            <td className="p-2 border font-semibold">{label}</td>
            {rows.map((r) => (
              <td key={r} className="p-2 border">
                <Input
                  type="number"
                  {...form.register(r as any)}
                  className="w-full"
                />
              </td>
            ))}
            <td className="p-2 border">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  {...form.register(tx as any)}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">Juta</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// components/kejadian/tables.tsx  (pick up exactly where the previous snippet ended)

export function PrasaranaTable({ form }: { form: UseFormReturn<FormValues> }) {
  const rows = [
    { label: "Jaringan Air Bersih/Minum", key: "txair" },
    { label: "Jaringan Lampu & Penerangan", key: "txlampu" },
    { label: "Jaringan Telekomunikasi", key: "txkom" },
    { label: "Jaringan Irigasi", key: "txiri" },
    { label: "Jalan (Km)", key: "txjln" },
    { label: "Jaringan Transportasi", key: "txtrans" },
    { label: "Jaringan Pengisian Bahan Bakar Umum", key: "txbbm" },
  ] as const;

  return (
    <table className="w-full text-sm border">
      <thead className="bg-muted">
        <tr>
          <th className="p-2 border text-left">Prasarana</th>
          <th className="p-2 border">Taksiran Kerugian (Juta)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ label, key }) => (
          <tr key={key}>
            <td className="p-2 border font-medium">{label}</td>
            <td className="p-2 border">
              <Input type="number" {...form.register(key)} className="w-full" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// components/kejadian/tables.tsx  (continue after the last exported table)

export function JembatanTable({ form }: { form: UseFormReturn<FormValues> }) {
  const rows = [
    { label: "Jembatan", keys: ["jb", "js", "jr", "jtrd"], tx: "txjembatan" },
  ];
  return (
    <table className="w-full text-sm border">
      <thead className="bg-muted">
        <tr>
          <th className="p-2 border">Kerusakan</th>
          <th className="p-2 border">RB</th>
          <th className="p-2 border">RS</th>
          <th className="p-2 border">RR</th>
          <th className="p-2 border">Terendam</th>
          <th className="p-2 border">Taksiran Kerugian</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ label, keys, tx }) => (
          <tr key={label}>
            <td className="p-2 border font-semibold">{label}</td>
            {keys.map((k) => (
              <td key={k} className="p-2 border">
                <Input
                  type="number"
                  {...form.register(k as any)}
                  className="w-full"
                />
              </td>
            ))}
            <td className="p-2 border">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  {...form.register(tx as any)}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">Juta</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function RumahTable({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <table className="w-full text-sm border">
      <thead className="bg-muted">
        <tr>
          <th className="p-2 border">Kerusakan</th>
          <th className="p-2 border">RB</th>
          <th className="p-2 border">RS</th>
          <th className="p-2 border">RR</th>
          <th className="p-2 border">Terendam</th>
          <th className="p-2 border">Taksiran Kerugian</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 border font-semibold">Rumah</td>
          <td className="p-2 border">
            <Input
              type="number"
              {...form.register("rmhb")}
              className="w-full"
            />
          </td>
          <td className="p-2 border">
            <Input
              type="number"
              {...form.register("rmhs")}
              className="w-full"
            />
          </td>
          <td className="p-2 border">
            <Input
              type="number"
              {...form.register("rmhr")}
              className="w-full"
            />
          </td>
          <td className="p-2 border">
            <Input
              type="number"
              {...form.register("rmhtrd")}
              className="w-full"
            />
          </td>
          <td className="p-2 border">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                {...form.register("txrmh")}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">Juta</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function PelayananTable({ form }: { form: UseFormReturn<FormValues> }) {
  const sectors = [
    { label: "Sekolah", keys: ["skob", "skos", "skor", "skotrd"], tx: "txsko" },
    {
      label: "Religi / Tempat Ibadah",
      keys: ["rib", "ris", "rir", "ritrd"],
      tx: "txri",
    },
    {
      label: "Fasilitas Kesehatan",
      keys: ["faskesb", "faskess", "faskesr", "faskestrd"],
      tx: "txfaskes",
    },
    { label: "Kantor", keys: ["ktrb", "ktrs", "ktrr", "ktrtrd"], tx: "txktr" },
    { label: "Pasar", keys: ["psrb", "psrs", "psrr", "psrtrd"], tx: "txpsr" },
  ];
  return (
    <table className="w-full text-sm border">
      <thead className="bg-muted">
        <tr>
          <th className="p-2 border">Sektor</th>
          <th className="p-2 border">RB</th>
          <th className="p-2 border">RS</th>
          <th className="p-2 border">RR</th>
          <th className="p-2 border">Terendam</th>
          <th className="p-2 border">Taksiran Kerugian</th>
        </tr>
      </thead>
      <tbody>
        {sectors.map(({ label, keys, tx }) => (
          <tr key={label}>
            <td className="p-2 border font-semibold">{label}</td>
            {keys.map((k) => (
              <td key={k} className="p-2 border">
                <Input
                  type="number"
                  {...form.register(k as any)}
                  className="w-full"
                />
              </td>
            ))}
            <td className="p-2 border">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  {...form.register(tx as any)}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">Juta</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
