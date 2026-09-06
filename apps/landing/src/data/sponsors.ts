import type { ImageMetadata } from "astro";

import Ansys from "../../public/ANSYS_logo.png";
import LabJack from "../../public/labjack.webp";

export interface Sponsor {
  /** Company name — also the logo's alt text. */
  name: string;
  logo: ImageMetadata;
  /** Sponsor's site. Omit for a logo that shouldn't link anywhere. */
  href?: string;
  /**
   * Height multiplier against the tier's logo height (default 1).
   * Wide wordmarks need ~0.5–0.7 to look level with a square badge.
   */
  scale?: number;
  /** Dark artwork that needs flipping to white for the dark page. */
  invert?: boolean;
  /** Supported us in the past — still credited, marked as former. */
  past?: boolean;
}

export interface SponsorTier {
  /** Tier name shown above the row. Rename freely — nothing keys off it. */
  name: string;
  /** Optional one-liner beside the tier name (contribution level, perks, etc). */
  blurb?: string;
  /**
   * Logo height for this tier, any CSS length. Leave it off and the section
   * ramps sizes automatically from the first tier down to the last.
   */
  logoHeight?: string;
  sponsors: Sponsor[];
}

/**
 * Highest tier first — display order, logo size and emphasis all follow this
 * array, so adding, removing or reordering tiers needs no component changes.
 * Tiers with no sponsors yet render as an open slot (see `showOpenTiers`).
 */
export const sponsorTiers: SponsorTier[] = [
  {
    name: "Tier 5",
    blurb: "(>=$10k) Flagship partners",
    sponsors: [
      {
        name: "Ansys",
        logo: Ansys,
        href: "https://www.ansys.com",
        invert: true,
        scale: .9,
      },
      {
        name: "LabJack",
        logo: LabJack,
        href: "https://www.labjack.com",
        invert: false,
        scale: .9,
      }
    ],
  },
  {
    name: "Tier 4",
    blurb: "(>=$7.0k) Flagship partners",
    sponsors: [],
  },
  {
    name: "Tier 3",
    blurb: "(>=$5.0k)  Program supporters",
    sponsors: [],
  },
  {
    name: "Tier 2",
    blurb: "(>=$2.5k) Program supporters",
    sponsors: [],
  },
  {
    name: "Tier 1",
    blurb: "(>=$1.0k) Program supporters",
    sponsors: [],
  },
  {
    name: "Tier 0",
    blurb: "(<=$999) Launch day friends",
    sponsors: [],
  }
];
