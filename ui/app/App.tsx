import { Page } from "@dynatrace/strato-components-preview/layouts";
import { SegmentsProvider } from "@dynatrace/strato-components/filters";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppFooter } from "./components/AppFooter";
import { Header } from "./components/Header";
import { AttributeAuditPage } from "./pages/AttributeAudit/AttributeAuditPage";
import { GlobalFilterStrip } from "./layout/GlobalFilterStrip";
import { SamplingProvider } from "./scope/SamplingContext";
import { ScanLimitProvider } from "./scope/ScanLimitContext";
import { ScopeProvider } from "./scope/ScopeContext";
import { GlobalFilterProvider } from "./scope/GlobalFilterContext";
import { ThemeStyles } from "./theme/ThemeStyles";

/**
 * Single-page app shell. The provider nesting mirrors the parent AI
 * Observability app so the AttributeAuditPage gets the exact same global scope
 * (timeframe + segments + filters + sampling + scan-limit). Tweaks, pricing,
 * and capability gating are intentionally dropped — the audit page never used
 * them.
 */
export const App = () => {
  return (
    <SegmentsProvider>
    <SamplingProvider>
    <ScanLimitProvider>
    <ScopeProvider>
    <GlobalFilterProvider>
      <ThemeStyles />
      <Page>
        <Page.Header>
          <Header />
          <GlobalFilterStrip />
        </Page.Header>
        <Page.Main>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
            }}
          >
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<AttributeAuditPage />} />
              </Routes>
            </div>
            <AppFooter />
          </div>
        </Page.Main>
      </Page>
    </GlobalFilterProvider>
    </ScopeProvider>
    </ScanLimitProvider>
    </SamplingProvider>
    </SegmentsProvider>
  );
};
