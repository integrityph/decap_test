---
title: Transparency
name: Transparency
subtitle: ''
main_menu: true
last_updated: 2025-07-09T21:32:00
order: 4
components:
  - por-counter
---
# Radical Transparency: Our Commitment to Openness and Proof

We believe trust in a financial system should be built on verifiable proof, not just promises. That’s why our entire platform, from the mobile app to the firmware running on the JavaCard Secure Element, is open source. We invite our users and the security community to scrutinize our work, contribute to our development, and hold us accountable. As part of this commitment, we have also open-sourced our custom plugin for BoringSSL, ensuring the cryptographic operations that power our platform are not only fast but demonstrably accurate.

## Proof of Reservse (PoR)

This ethos of transparency is most critical when it comes to our custodial Lightning Network service. While this service requires us to hold funds on your behalf to provide instant transactions, we provide a mathematical and continuous way for you to verify our solvency. We utilize the industry-standard Merkle tree-based Proof of Reserve (PoR) system. A new Merkle root, which cryptographically represents the sum of all user balances, is published daily for public verification.

## Continuously Audited

You are never required to trust us blindly. Through our open API, any user can receive a personalized data package to independently calculate their own inclusion in the latest reserve proof. In fact, the Tejory app passively performs this verification for you every time it opens. This user-powered, continuous audit is reflected in the live counter on this page, showcasing the millions of successful verifications performed by our clients and providing a real-time testament to our system's integrity.

## Join our Community Audit Program

To further decentralize trust, we invite our community members to become independent auditors. By running the same open-source Proof of Reserve software we use, you can continuously and independently verify our system's solvency. If you're interested in participating, please join our <span class="text-amber-400">[**discord group**](#)</span> or email us directly at **por@tejory.io** to get started.
