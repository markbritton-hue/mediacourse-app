import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { createEquipment } from "@/lib/actions/entities";
import { EquipmentStatusSelect } from "@/components/equipment/EquipmentStatusSelect";

const CATEGORIES = [
  "CAMERAS", "LENSES", "TRIPODS", "MICROPHONES", "WIRELESS_AUDIO", "AUDIO_MIXERS",
  "VIDEO_SWITCHERS", "ENCODERS", "COMPUTERS", "MONITORS", "LIGHTING", "CABLES",
  "ADAPTERS", "STREAMING_DEVICES", "NETWORK_EQUIPMENT", "ACCESSORIES",
];

export default async function EquipmentPage() {
  const equipment = await prisma.equipment.findMany({ orderBy: { category: "asc" } });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Equipment</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Inventory, status, and checkout tracking.</p>
      </div>

      <Card>
        <CardHeader title="Add Equipment" />
        <CardBody>
          <form action={createEquipment} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <input name="manufacturer" placeholder="Manufacturer" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <input name="model" placeholder="Model" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <select name="category" required className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
              ))}
            </select>
            <input name="quantity" type="number" placeholder="Quantity" defaultValue={1} className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <input name="assetNumber" placeholder="Asset number" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <input name="location" placeholder="Location" className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-zinc-100" />
            <Button type="submit" size="sm" className="col-span-2 sm:col-span-1">Add Equipment</Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Inventory" subtitle={`${equipment.length} items`} />
        <CardBody>
          {equipment.length === 0 ? (
            <EmptyState title="No equipment recorded yet" />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {equipment.map((e) => (
                <li key={e.id} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="text-sm text-zinc-100">{e.manufacturer} {e.model}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {e.category.replace(/_/g, " ")} · Qty {e.quantity} {e.assetNumber ? `· ${e.assetNumber}` : ""}
                    </p>
                  </div>
                  <EquipmentStatusSelect equipmentId={e.id} status={e.status} />
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
