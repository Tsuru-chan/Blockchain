"use client";

import { useState } from "react";
import { useHub } from "@/components/app-context";
import { HashField, LabHeader, LabNotes, LabTray, Stamp } from "@/components/lab/lab";
import { ecdsaSignHex, ecdsaVerifyHex, exportRawPubHex, genECDSAKeyPair } from "@/lib/crypto/blockchain";

export function RsaView() {
  const { t } = useHub();
  const [msg, setMsg] = useState("Alice gửi 10 cho Bob");
  const [keys, setKeys] = useState<CryptoKeyPair | null>(null);
  const [pubHex, setPubHex] = useState("");
  const [signed, setSigned] = useState<{ message: string; signature: string } | null>(null);
  const [verification, setVerification] = useState<{ message: string; valid: boolean } | null>(null);
  const [busy, setBusy] = useState<"keys" | "sign" | "verify" | null>(null);
  const [error, setError] = useState("");
  const currentVerification = verification?.message === msg ? verification : null;
  const changed = signed !== null && signed.message !== msg;
  const generate = async () => {
    setBusy("keys"); setError("");
    try {
      const pair = await genECDSAKeyPair();
      const raw = await exportRawPubHex(pair.publicKey);
      setKeys(pair); setPubHex(raw); setSigned(null); setVerification(null);
    } catch { setError(t("ui.cryptoError")); }
    finally { setBusy(null); }
  };
  const sign = async () => {
    if (!keys) return;
    setBusy("sign"); setError("");
    try { setSigned({ message: msg, signature: await ecdsaSignHex(keys.privateKey, msg) }); setVerification(null); }
    catch { setError(t("ui.cryptoError")); }
    finally { setBusy(null); }
  };
  const verify = async () => {
    if (!keys || !signed) return;
    setBusy("verify"); setError("");
    try { setVerification({ message: msg, valid: await ecdsaVerifyHex(keys.publicKey, msg, signed.signature) }); }
    catch { setError(t("ui.cryptoError")); }
    finally { setBusy(null); }
  };
  return (
    <div className="lab-view">
      <LabHeader title={t("ui.rsaTitle")} desc={t("ui.rsaDesc")} code="P3 / ECDSA" />
      <LabTray>
        <label className="label" htmlFor="signature-message">{t("ui.message")}</label>
        <input id="signature-message" className="inp" value={msg} disabled={busy !== null} onChange={(event) => { setMsg(event.target.value); setVerification(null); }} />
        <div className="flex flex-wrap gap-3 mt-4">
          <button className="btn btn-ghost btn-sm" disabled={busy !== null} onClick={() => { setMsg("Alice gửi 10 cho Bob"); setVerification(null); }}>{t("ui.original")}</button>
          <button className="btn btn-tamper btn-sm" disabled={busy !== null} onClick={() => { setMsg("Alice gửi 100 cho Bob"); setVerification(null); }}>{t("ui.tamper")}</button>
        </div>
      </LabTray>
      <ol className="signature-steps">
        <li><span className="step-number" aria-hidden>1</span><h2>{t("ui.keyTitle")}</h2><p>{t("ui.keyDesc")}</p><button className="btn btn-primary" disabled={busy !== null} onClick={generate}>{t(busy === "keys" ? "ui.working" : "ui.generate")}</button><div className="signature-output"><div className="label">{t("ui.publicKey")}</div>{pubHex ? <HashField hash={pubHex} /> : <p>{t("ui.awaitKeys")}</p>}</div></li>
        <li><span className="step-number" aria-hidden>2</span><h2>{t("ui.signTitle")}</h2><p>{t("ui.signDesc")}</p><button className="btn btn-primary" disabled={busy !== null || !keys || !msg} onClick={sign}>{t(busy === "sign" ? "ui.working" : "ui.sign")}</button><div className="signature-output"><div className="label">{t("ui.signature")}</div>{signed ? <><HashField hash={signed.signature} /><p className="mt-4">{t("ui.signedMessage")}: <strong>{signed.message}</strong></p></> : <p>{t("ui.awaitSignature")}</p>}</div></li>
        <li><span className="step-number" aria-hidden>3</span><h2>{t("ui.verifyTitle")}</h2><p>{t("ui.verifyDesc")}</p><button className="btn btn-primary" disabled={busy !== null || !signed || !keys} onClick={verify}>{t(busy === "verify" ? "ui.working" : "ui.verify")}</button><div className="signature-output" role="status" aria-atomic="true">{currentVerification ? <><Stamp tone={currentVerification.valid ? "valid" : "invalid"}>{t(currentVerification.valid ? "ui.valid" : "ui.invalid")}</Stamp><p className="mt-4">{t(currentVerification.valid ? "ui.validSignature" : "ui.invalidSignature")}</p></> : <p>{t(changed ? "ui.messageChanged" : signed ? "ui.awaitVerify" : "ui.awaitSignature")}</p>}</div></li>
      </ol>
      {error && <p className="error-message" role="alert">{error}</p>}
      <LabNotes title={t("ui.rsaNotes")}><p>{t("ui.rsaNote")}</p></LabNotes>
    </div>
  );
}
