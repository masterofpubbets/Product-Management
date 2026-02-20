// i18n
import "src/locales/i18n";

// scrollbar
import "simplebar-react/dist/simplebar.min.css";

// lightbox
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// map
import "mapbox-gl/dist/mapbox-gl.css";

// editor
import "react-quill/dist/quill.snow.css";

// carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// image
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

// @mui
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// theme
import ThemeProvider from "src/theme";
// components
import ProgressBar from "src/components/progress-bar";
import SnackbarProvider from "src/components/snackbar/snackbar-provider";
import { SettingsProvider, SettingsDrawer } from "src/components/settings";
// providers
import { AuthProvider } from "src/auth/context/jwt/auth-context";
import { ProductProvider } from "./context/ProductContext";
import {StakeholderProvider} from "src/context/stakeholderContext";
import {StrategyProvider} from "src/context/StrategyContext";
import {FeatureProvider} from "src/context/FeatureContext";
import {CompetitionProvider} from "src/context/CompetitionContext";
import {TargetAudProvider} from "src/context/TargetAudContext";
import {BusinessModelProvider} from "src/context/BusinessModelContext";
import {OkrProvider} from "src/context/OkrContext";

// routes
import AppRoute from "./routes/AppRoutes";

// ----------------------------------------------------------------------

export default function App() {
  const charAt = `

  ▒▒▒▒▒▒▒▒▒▒
  ▒▒
  ░░░░░░░░░░
  ██
  ██████████

  `;

  console.info(`%c${charAt}`, "color: #5BE49B");

  return (
    <AuthProvider>
      <ProductProvider>
        <StakeholderProvider>
          <StrategyProvider>
            <OkrProvider>
              <FeatureProvider>
                <CompetitionProvider>
                  <TargetAudProvider>
                    <BusinessModelProvider>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <SettingsProvider
                          defaultSettings={{
                            themeMode: "light", // 'light' | 'dark'
                            themeDirection: "ltr", //  'rtl' | 'ltr'
                            themeContrast: "default", // 'default' | 'bold'
                            themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
                            themeColorPresets: "blue", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                            themeStretch: true,
                          }}
                        >
                          <ThemeProvider>
                            <SnackbarProvider>
                              <SettingsDrawer />
                              <ProgressBar />
                              <AppRoute />
                            </SnackbarProvider>
                          </ThemeProvider>
                        </SettingsProvider>
                      </LocalizationProvider>
                    </BusinessModelProvider>
                  </TargetAudProvider>
                </CompetitionProvider>
              </FeatureProvider>
            </OkrProvider>
          </StrategyProvider>
        </StakeholderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
