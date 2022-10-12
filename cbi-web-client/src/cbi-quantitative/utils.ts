import { CbiQuantitativeCalcProps } from "./interface";

export function calcOne({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E = 1,22 x SFw x SFp x SFo x A x 28
  const SFp = getTrueVal([1, "SFp", "SFp"]);
  const SFw_VDX = getTrueVal([1, "SFw", "VDX", "A"]);
  const SFw_VHT = getTrueVal([1, "SFw", "VHT", "A"]);
  const SFw_VTD = getTrueVal([1, "SFw", "VTD", "A"]);

  const SFo_VDX = getTrueVal([1, "SFo", "VDX"]);
  const SFo_VHT = getTrueVal([1, "SFo", "VHT"]);
  const SFo_VTD = getTrueVal([1, "SFo", "VTD"]);

  const A_VDX = getTrueVal([1, "SFw", "VDX", "X"]);
  const A_VHT = getTrueVal([1, "SFw", "VHT", "X"]);
  const A_VTD = getTrueVal([1, "SFw", "VTD", "X"]);

  const E_VDX = 1.22 * SFw_VDX * SFp * SFo_VDX * A_VDX * 28;
  const E_VHT = 1.22 * SFw_VHT * SFp * SFo_VHT * A_VHT * 28;
  const E_VTD = 1.22 * SFw_VTD * SFp * SFo_VTD * A_VTD * 28;

  const E = E_VDX + E_VHT + E_VTD;
  updateCbiResult({
    name,
    vdx: E_VDX,
    vht: E_VHT,
    vtd: E_VTD,
    total: E,
  });
  return E || 0;
}

export function calcTwo({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E = S x S'
  const S_VDX = getTrueVal([2, "E", "VDX", "S"]);
  const S_VHT = getTrueVal([2, "E", "VHT", "S"]);
  const S_VTD = getTrueVal([2, "E", "VTD", "S"]);

  const Sz_VDX = getTrueVal([2, "E", "VDX", "S'"]);
  const Sz_VHT = getTrueVal([2, "E", "VHT", "S'"]);
  const Sz_VTD = getTrueVal([2, "E", "VTD", "S'"]);

  const E_VDX = S_VDX * Sz_VDX;
  const E_VHT = S_VHT * Sz_VHT;
  const E_VTD = S_VTD * Sz_VTD;

  const E = E_VDX + E_VHT + E_VTD;
  updateCbiResult({
    name,
    vdx: E_VDX,
    vht: E_VHT,
    vtd: E_VTD,
    total: E,
  });
  return E || 0;
}

export function calcThree({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E = ( L1 x A x EF x 256)+( L2 x A x EF x 256)+( L3 x A x EF x 256)+( L4 x A x EF x 256)
  const EF_VDX = getTrueVal([3, "EF", "VDX"]);
  const EF_VHT = getTrueVal([3, "EF", "VHT"]);
  const EF_VTD = getTrueVal([3, "EF", "VTD"]);

  const L1_VDX = getTrueVal([3, "L1", "VDX", "A"]) * getTrueVal([3, "L1", "VDX", "X"]);
  const L1_VHT = getTrueVal([3, "L1", "VHT", "A"]) * getTrueVal([3, "L1", "VHT", "X"]);
  const L1_VTD = getTrueVal([3, "L1", "VTD", "A"]) * getTrueVal([3, "L1", "VTD", "X"]);

  const L2_VDX = getTrueVal([3, "L2", "VDX", "A"]) * getTrueVal([3, "L2", "VDX", "X"]);
  const L2_VHT = getTrueVal([3, "L2", "VHT", "A"]) * getTrueVal([3, "L2", "VHT", "X"]);
  const L2_VTD = getTrueVal([3, "L2", "VTD", "A"]) * getTrueVal([3, "L2", "VTD", "X"]);

  const L3_VDX = getTrueVal([3, "L3", "VDX", "A"]) * getTrueVal([3, "L3", "VDX", "X"]);
  const L3_VHT = getTrueVal([3, "L3", "VHT", "A"]) * getTrueVal([3, "L3", "VHT", "X"]);
  const L3_VTD = getTrueVal([3, "L3", "VTD", "A"]) * getTrueVal([3, "L3", "VTD", "X"]);

  const L4_VDX = getTrueVal([3, "L4", "VDX", "A"]) * getTrueVal([3, "L4", "VDX", "X"]);
  const L4_VHT = getTrueVal([3, "L4", "VHT", "A"]) * getTrueVal([3, "L4", "VHT", "X"]);
  const L4_VTD = getTrueVal([3, "L4", "VTD", "A"]) * getTrueVal([3, "L4", "VTD", "X"]);

  const E_VDX =
    L1_VDX * EF_VDX * 256 + L2_VDX * EF_VDX * 256 + L3_VDX * EF_VDX * 256 + L4_VDX * EF_VDX * 256;
  const E_VHT =
    L1_VHT * EF_VHT * 256 + L2_VHT * EF_VHT * 256 + L3_VHT * EF_VHT * 256 + L4_VHT * EF_VHT * 256;
  const E_VTD =
    L1_VTD * EF_VTD * 256 + L2_VTD * EF_VTD * 256 + L3_VTD * EF_VTD * 256 + L4_VTD * EF_VTD * 256;

  const E = E_VDX + E_VHT + E_VTD;
  updateCbiResult({
    name,
    vdx: E_VDX,
    vht: E_VHT,
    vtd: E_VTD,
    total: E,
  });
  return E || 0;
}

export function calcFour({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E=(L1 x A x 3,63)+(L2 x A x 0,13)+(L3 x A x 0,56)+(L4 x A x 4,59)
  const L1_VDX = getTrueVal([4, "L1", "VDX", "kg"]) * getTrueVal([4, "L1", "VDX", "ha"]);
  const L1_VHT = getTrueVal([4, "L1", "VHT", "kg"]) * getTrueVal([4, "L1", "VHT", "ha"]);
  const L1_VTD = getTrueVal([4, "L1", "VTD", "kg"]) * getTrueVal([4, "L1", "VTD", "ha"]);

  const L2_VDX = getTrueVal([4, "L2", "VDX", "kg"]) * getTrueVal([4, "L2", "VDX", "ha"]);
  const L2_VHT = getTrueVal([4, "L2", "VHT", "kg"]) * getTrueVal([4, "L2", "VHT", "ha"]);
  const L2_VTD = getTrueVal([4, "L2", "VTD", "kg"]) * getTrueVal([4, "L2", "VTD", "ha"]);

  const L3_VDX = getTrueVal([4, "L3", "VDX", "kg"]) * getTrueVal([4, "L3", "VDX", "ha"]);
  const L3_VHT = getTrueVal([4, "L3", "VHT", "kg"]) * getTrueVal([4, "L3", "VHT", "ha"]);
  const L3_VTD = getTrueVal([4, "L3", "VTD", "kg"]) * getTrueVal([4, "L3", "VTD", "ha"]);

  const L4_VDX = getTrueVal([4, "L4", "VDX", "kg"]) * getTrueVal([4, "L4", "VDX", "ha"]);
  const L4_VHT = getTrueVal([4, "L4", "VHT", "kg"]) * getTrueVal([4, "L4", "VHT", "ha"]);
  const L4_VTD = getTrueVal([4, "L4", "VTD", "kg"]) * getTrueVal([4, "L4", "VTD", "ha"]);

  const E_VDX = L1_VDX * 3.63 + L2_VDX * 0.13 + L3_VDX * 0.56 + L4_VDX * 4.59;
  const E_VHT = L1_VHT * 3.63 + L2_VHT * 0.13 + L3_VHT * 0.56 + L4_VHT * 4.59;
  const E_VTD = L1_VTD * 3.63 + L2_VTD * 0.13 + L3_VTD * 0.56 + L4_VTD * 4.59;

  const E = E_VDX + E_VHT + E_VTD;
  updateCbiResult({
    name,
    vdx: E_VDX,
    vht: E_VHT,
    vtd: E_VTD,
    total: E,
  });
  return E || 0;
}

export function calcFive({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E= L5 x A x 0,2 x 44/12
  const L5_VDX = getTrueVal([5, "L5", "VDX", "kg"]);
  const L5_VHT = getTrueVal([5, "L5", "VHT", "kg"]);
  const L5_VTD = getTrueVal([5, "L5", "VTD", "kg"]);

  const A_VDX = getTrueVal([5, "L5", "VDX", "ha"]);
  const A_VHT = getTrueVal([5, "L5", "VHT", "ha"]);
  const A_VTD = getTrueVal([5, "L5", "VTD", "ha"]);

  const E_VDX = L5_VDX * A_VDX * 0.2 * (44 / 12);
  const E_VHT = L5_VHT * A_VHT * 0.2 * (44 / 12);
  const E_VTD = L5_VTD * A_VTD * 0.2 * (44 / 12);

  const E = E_VDX + E_VHT + E_VTD;
  updateCbiResult({
    name,
    vdx: E_VDX,
    vht: E_VHT,
    vtd: E_VTD,
    total: E,
  });
  return E || 0;
}

export function calcSix({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E= N x S x A x 10^3
  // "A. Lúa lai=2,24 B.Lúa Thuần = 1,12"

  const LT_VDX =
    getTrueVal([6, "6.2", "VDX", "S1"]) * getTrueVal([6, "6.1", "VDX", "A1"]) * 1.12 * 10 ** 3;
  const LT_VHT =
    getTrueVal([6, "6.2", "VHT", "S1"]) * getTrueVal([6, "6.1", "VHT", "A1"]) * 1.12 * 10 ** 3;
  const LT_VTD =
    getTrueVal([6, "6.2", "VTD", "S1"]) * getTrueVal([6, "6.1", "VTD", "A1"]) * 1.12 * 10 ** 3;

  const LL_VDX =
    getTrueVal([6, "6.2", "VDX", "S2"]) * getTrueVal([6, "6.1", "VDX", "A2"]) * 2.24 * 10 ** 3;
  const LL_VHT =
    getTrueVal([6, "6.2", "VHT", "S2"]) * getTrueVal([6, "6.1", "VHT", "A2"]) * 2.24 * 10 ** 3;
  const LL_VTD =
    getTrueVal([6, "6.2", "VTD", "S2"]) * getTrueVal([6, "6.1", "VTD", "A2"]) * 2.24 * 10 ** 3;

  const E_VDX = LT_VDX + LL_VDX;
  const E_VHT = LT_VHT + LL_VHT;
  const E_VTD = LT_VTD + LL_VTD;

  const E = E_VDX + E_VHT + E_VTD;
  updateCbiResult({
    name,
    vdx: E_VDX,
    vht: E_VHT,
    vtd: E_VTD,
    total: E,
  });
  return E || 0;
}

export function calcSeven({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E= (B x A) + (C x A x 25,5)
  const isUseBVTV = getTrueVal([7, "isUseBVTV", "isUseBVTV"]);
  const B_VDX = isUseBVTV ? getTrueVal([7, "7.1", "VDX", "B"]) : 0;
  const B_VHT = isUseBVTV ? getTrueVal([7, "7.1", "VHT", "B"]) : 0;
  const B_VTD = isUseBVTV ? getTrueVal([7, "7.1", "VTD", "B"]) : 0;

  const A1_VDX = isUseBVTV ? getTrueVal([7, "7.1", "VDX", "A"]) : 0;
  const A1_VHT = isUseBVTV ? getTrueVal([7, "7.1", "VHT", "A"]) : 0;
  const A1_VTD = isUseBVTV ? getTrueVal([7, "7.1", "VTD", "A"]) : 0;

  const isProduceBVTV = getTrueVal([7, "isProduceBVTV", "isProduceBVTV"]);
  const C_VDX = isProduceBVTV ? getTrueVal([7, "7.2", "VDX", "C"]) : 0;
  const C_VHT = isProduceBVTV ? getTrueVal([7, "7.2", "VHT", "C"]) : 0;
  const C_VTD = isProduceBVTV ? getTrueVal([7, "7.2", "VTD", "C"]) : 0;

  const A2_VDX = isProduceBVTV ? getTrueVal([7, "7.2", "VDX", "A"]) : 0;
  const A2_VHT = isProduceBVTV ? getTrueVal([7, "7.2", "VHT", "A"]) : 0;
  const A2_VTD = isProduceBVTV ? getTrueVal([7, "7.2", "VTD", "A"]) : 0;

  const E_VDX = B_VDX * A1_VDX + C_VDX * A2_VDX * 25.5;
  const E_VHT = B_VHT * A1_VHT + C_VHT * A2_VHT * 25.5;
  const E_VTD = B_VTD * A1_VTD + C_VTD * A2_VTD * 25.5;

  const E = E_VDX + E_VHT + E_VTD;
  updateCbiResult({
    name,
    vdx: E_VDX,
    vht: E_VHT,
    vtd: E_VTD,
    total: E,
  });
  return E || 0;
}

export function calcEight({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E= (D x A * S) x 5 + (G x A)

  const S_VDX = getTrueVal([8, "8.13", "VDX", "S"]);
  const S_VHT = getTrueVal([8, "8.13", "VHT", "S"]);
  const S_VTD = getTrueVal([8, "8.13", "VTD", "S"]);

  let E1_VDX = 0,
    E1_VHT = 0,
    E1_VTD = 0;
  const isUseMachine1 = getTrueVal([8, "8.1", "isUseMachine"]);
  if (isUseMachine1) {
    E1_VDX = getTrueVal([8, "8.2", "VDX", "A"]) * getTrueVal([8, "8.2", "VDX", "D"]) * S_VDX;
    E1_VHT = getTrueVal([8, "8.2", "VHT", "A"]) * getTrueVal([8, "8.2", "VHT", "D"]) * S_VHT;
    E1_VTD = getTrueVal([8, "8.2", "VTD", "A"]) * getTrueVal([8, "8.2", "VTD", "D"]) * S_VTD;
  }

  let E2_VDX = 0,
    E2_VHT = 0,
    E2_VTD = 0;
  const isUseMachine2 = getTrueVal([8, "8.3", "isUseMachine"]);
  if (isUseMachine2) {
    E2_VDX = getTrueVal([8, "8.4", "VDX", "A"]) * getTrueVal([8, "8.4", "VDX", "D"]) * S_VDX;
    E2_VHT = getTrueVal([8, "8.4", "VHT", "A"]) * getTrueVal([8, "8.4", "VHT", "D"]) * S_VHT;
    E2_VTD = getTrueVal([8, "8.4", "VTD", "A"]) * getTrueVal([8, "8.4", "VTD", "D"]) * S_VTD;
  }

  const G = getTrueVal([8, "8.6", "G"]);
  const E3_VDX = getTrueVal([8, "8.7", "VDX", "A"]) * G * S_VDX;
  const E3_VHT = getTrueVal([8, "8.7", "VHT", "A"]) * G * S_VHT;
  const E3_VTD = getTrueVal([8, "8.7", "VTD", "A"]) * G * S_VTD;

  let E4_VDX = 0,
    E4_VHT = 0,
    E4_VTD = 0;
  const isUseMachine4 = getTrueVal([8, "8.8", "isUseMachine"]);
  if (isUseMachine4) {
    E4_VDX = getTrueVal([8, "8.9", "VDX", "A"]) * getTrueVal([8, "8.9", "VDX", "D"]) * S_VDX;
    E4_VHT = getTrueVal([8, "8.9", "VHT", "A"]) * getTrueVal([8, "8.9", "VHT", "D"]) * S_VHT;
    E4_VTD = getTrueVal([8, "8.9", "VTD", "A"]) * getTrueVal([8, "8.9", "VTD", "D"]) * S_VTD;
  }

  let E5_VDX = 0,
    E5_VHT = 0,
    E5_VTD = 0;
  const isUseMachine5 = getTrueVal([8, "8.10", "isUseMachine"]);
  if (isUseMachine5) {
    E5_VDX = getTrueVal([8, "8.11", "VDX", "A"]) * getTrueVal([8, "8.11", "VDX", "D"]) * S_VDX;
    E5_VHT = getTrueVal([8, "8.11", "VHT", "A"]) * getTrueVal([8, "8.11", "VHT", "D"]) * S_VHT;
    E5_VTD = getTrueVal([8, "8.11", "VTD", "A"]) * getTrueVal([8, "8.11", "VTD", "D"]) * S_VTD;
  }

  const E6_VDX = getTrueVal([8, "8.12", "VDX", "A"]) * getTrueVal([8, "8.12", "VDX", "D"]) * S_VDX;
  const E6_VHT = getTrueVal([8, "8.12", "VHT", "A"]) * getTrueVal([8, "8.12", "VHT", "D"]) * S_VHT;
  const E6_VTD = getTrueVal([8, "8.12", "VTD", "A"]) * getTrueVal([8, "8.12", "VTD", "D"]) * S_VTD;

  const E_VDX = E1_VDX + E2_VDX + E3_VDX + E4_VDX + E5_VDX + E6_VDX;
  const E_VHT = E1_VHT + E2_VHT + E3_VHT + E4_VHT + E5_VHT + E6_VHT;
  const E_VTD = E1_VTD + E2_VTD + E3_VTD + E4_VTD + E5_VTD + E6_VTD;

  const E = E_VDX + E_VHT + E_VTD;
  updateCbiResult({
    name,
    vdx: E_VDX,
    vht: E_VHT,
    vtd: E_VTD,
    total: E,
  });
  return E || 0;
}

export function calcNine({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E= (I x H x S x 10^3)
  const H = getTrueVal([9, "H1", "H"]);
  const I = getTrueVal([9, "H1", "I"]);
  const S = getTrueVal([9, "S", "S"]);
  const E = I * H * S * 10 ** 3;
  updateCbiResult({
    name,
    total: E,
  });
  return E || 0;
}

export function calcTen({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E = K x S
  const K_VDX = getTrueVal([10, "10.1", "VDX", "K"]);
  const K_VHT = getTrueVal([10, "10.1", "VHT", "K"]);
  const K_VTD = getTrueVal([10, "10.1", "VTD", "K"]);

  const S_VDX = getTrueVal([10, "10.1", "VDX", "S"]);
  const S_VHT = getTrueVal([10, "10.1", "VHT", "S"]);
  const S_VTD = getTrueVal([10, "10.1", "VTD", "S"]);

  const E_VDX = K_VDX * S_VDX;
  const E_VHT = K_VHT * S_VHT;
  const E_VTD = K_VTD * S_VTD;

  const E = E_VDX + E_VHT + E_VTD;
  updateCbiResult({
    name,
    vdx: E_VDX,
    vht: E_VHT,
    vtd: E_VTD,
    total: E,
  });
  return E || 0;
}

export function calcEleven({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E = M x S
  const M = getTrueVal([11, "11.2", "M"]);
  const S = getTrueVal([11, "11.2", "S"]);
  const E = M * S;
  updateCbiResult({
    name,
    total: E,
  });
  return E || 0;
}

export function calcTwelve({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  // E = N x S
  const N = getTrueVal([12, "E", "N"]);
  const S = getTrueVal([12, "E", "S"]);
  const E = N * S;
  updateCbiResult({
    name,
    total: E,
  });
  return E || 0;
}

export function calcThirteen({ getTrueVal, updateCbiResult, name }: CbiQuantitativeCalcProps) {
  //E = O x S
  const O = getTrueVal([13, "E", "O"]);
  const S = getTrueVal([13, "E", "S"]);
  const E = O * S;
  updateCbiResult({
    name,
    total: E,
  });
  return E || 0;
}
