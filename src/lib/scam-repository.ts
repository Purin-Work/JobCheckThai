import { scamContacts } from "@/lib/mock-data";
import type { ScamContact } from "@/lib/types";

export interface ScamContactRepository {
  findByValue(value: string): Promise<ScamContact | null>;
  findById(id: string): Promise<ScamContact | null>;
}

class MockScamContactRepository implements ScamContactRepository {
  async findByValue(value: string) {
    const normalized = value.trim().toLowerCase().replace(/\s+/g, "");
    return (
      scamContacts.find(
        (contact) => contact.value.toLowerCase().replace(/\s+/g, "") === normalized,
      ) ?? null
    );
  }

  async findById(id: string) {
    return scamContacts.find((contact) => contact.id === id) ?? null;
  }
}

// Swap this instance with a Supabase-backed repository without changing the UI/API.
export const scamContactRepository: ScamContactRepository =
  new MockScamContactRepository();
