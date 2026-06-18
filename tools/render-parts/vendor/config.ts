// Basic UI configuration; adjust these flags to toggle optional panels.
interface UiConfig {
  showCatalog: boolean;
  showMeasurements: boolean;
}

// 3D printing configuration; settings to optimize parts for printing.
interface PrintConfig {
  /** 
   * When enabled, adds a conical taper from the interior diameter back to the 
   * pin hole diameter at the bottom of vertical (Y-oriented) pinholes. This 
   * removes overhangs that print poorly on FDM printers.
   */
  basePinTaper: boolean;
  
  /**
   * Specifies which direction along the Y axis is "down" toward the print bed.
   * Set to -1 if negative Y is the bottom (default), or 1 if positive Y is the bottom.
   * The taper will only be applied to pinholes on the most extreme side in this direction.
   */
  printBedYDirection: -1 | 1;
}

const APP_CONFIG: UiConfig = {
  showCatalog: true,
  showMeasurements: false
};

const PRINT_CONFIG: PrintConfig = {
  basePinTaper: true,
  printBedYDirection: -1
};
