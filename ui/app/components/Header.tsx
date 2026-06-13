import React from "react";
import { AppHeader } from "@dynatrace/strato-components-preview/layouts";
import { Heading } from "@dynatrace/strato-components/typography";
import { HeaderTimeframe } from "./HeaderTimeframe";

/**
 * Single-page header for the AI Attributes Audit app. Unlike the multi-tab
 * parent app this is carved out of, there is no top-nav: just the app title and
 * the global timeframe selector. Segments, filters, sampling, and scan-limit
 * controls live in the GlobalFilterStrip directly below.
 */
export const Header = () => {
  return (
    <AppHeader>
      <AppHeader.Navigation>
        <AppHeader.Logo />
        <Heading level={6} style={{ margin: 0, alignSelf: "center" }}>
          AI Attributes Audit
        </Heading>
      </AppHeader.Navigation>
      <AppHeader.ActionItems>
        <HeaderTimeframe />
      </AppHeader.ActionItems>
    </AppHeader>
  );
};
