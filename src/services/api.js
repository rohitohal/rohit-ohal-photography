import { weddings } from "../data/weddings";

export const api = {
  async getWeddings() {
    return weddings;
  },

  async getWedding(slug) {
    return weddings.find((wedding) => wedding.slug === slug);
  },
};