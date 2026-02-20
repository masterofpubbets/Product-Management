import {useMemo, useEffect, useState} from "react";
// routes
import { paths } from "src/routes/paths";
// locales
import { useLocales } from "src/locales";
// components
import SvgColor from "src/components/svg-color";
import { useProduct } from "src/hooks/useProducts";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon("ic_job"),
  blog: icon("ic_blog"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  tour: icon("ic_tour"),
  order: icon("ic_order"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  product: icon("ic_product"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
  info: icon("ic_info"),
  manpower: icon("ic_supervisor"),
  model: icon("ic_factory"),
  printer: icon("ic_printer"),
  shipment: icon("ic_shipment"),
  blockage: icon("ic_blockage"),
  artifact: icon("artifact"),
  business_model: icon("business_model"),
  feature_analysis: icon("feature_analysis"),
  feature_roadmap: icon("feature_roadmap"),
  ic_st_map: icon("ic_st_map"),
  ic_stakeholder: icon("ic_stakeholder"),
  idea: icon("idea"),
  Iniative: icon("Iniative"),
  kano_model: icon("kano_model"),
  kpi: icon("kpi"),
  marketing_analysis: icon("marketing_analysis"),
  new_feature: icon("new_feature"),
  okr: icon("okr"),
  pbi: icon("pbi"),
  pro_innfo: icon("pro_innfo"),
  pro_strategy: icon("pro_strategy"),
  product_roadmap: icon("product_roadmap"),
  realse_roadmap: icon("realse_roadmap"),
  report: icon("report"),
  sprint: icon("sprint"),
  target_audience: icon("target_audience"),
  team: icon("team"),
  user_persona: icon("user_persona"),
  user_research: icon("user_research"),
  dod: icon("ic_dod"),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();
  const {selectedProduct} = useProduct();
  const [proName, setProName] = useState('No Product');

  useEffect(() => {
    if(selectedProduct.id !== null){
      setProName(selectedProduct.details.name)
    } else {
      setProName('No Product')
    }
  }, [selectedProduct.version])

  const dataAdmin = useMemo(
    () => [

      {
        subheader: t("Product"),
        items: [
          {
            title: proName,
            path: paths.product.root,
            icon: ICONS.product,
          },
        ],
      },

      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t("overview"),
        items: [
          {
            title: t("dashboard"),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
        ],
      },

      // Stakeholders
      // ----------------------------------------------------------------------
      {
        subheader: t("stakeholders"),
        items: [
          {
            title: t("Stakeholder analysis"),
            path: paths.stakeholder.root,
            icon: ICONS.ic_stakeholder,
          },
        ],
      },

      // Strategy
      // ----------------------------------------------------------------------
      {
        subheader: t("strategy"),
        items: [
          {
            title: t("Product Strategy"),
            path: paths.strategy.root,
            icon: ICONS.pro_strategy,
          },
          {
            title: t("Features Analysis"),
            path: paths.feature.root,
            icon: ICONS.feature_analysis,
          },
          {
            title: t("Assess Competition"),
            path: paths.marketAnalysis.root,
            icon: ICONS.marketing_analysis,
          },
          {
            title: t("Target Audience"),
            path: paths.targetAud.root,
            icon: ICONS.target_audience,
          },
          {
            title: t("Business Model Canvas"),
            path: paths.businessModel.root,
            icon: ICONS.business_model,
          },
        ],
      },

      // Execution
      // ----------------------------------------------------------------------
      {
        subheader: t("Execution"),
        items: [
          {
            title: t("OKRs"),
            path: paths.okr.root,
            icon: ICONS.okr,
          },
          {
            title: t("KPI"),
            path: '',
            icon: ICONS.kpi,
          },
          {
            title: t("Ideas"),
            path: '',
            icon: ICONS.idea,
          },
          {
            title: t("User Research"),
            path: '',
            icon: ICONS.user_research,
          },
        ],
      },

      // Roadmaps
      // ----------------------------------------------------------------------
      {
        subheader: t("Roadmaps"),
        items: [
          {
            title: t("Product Roadmap"),
            path: '',
            icon: ICONS.product_roadmap,
          },
          {
            title: t("Features Roadmap"),
            path: '',
            icon: ICONS.feature_roadmap,
          },
          {
            title: t("Release Roadmap"),
            path: '',
            icon: ICONS.realse_roadmap,
          },
        ],
      },

      // Development
      // ----------------------------------------------------------------------
      {
        subheader: t("Development"),
        items: [
          {
            title: t("DOD"),
            path: '',
            icon: ICONS.dod,
          },
          {
            title: t("PBI"),
            path: '',
            icon: ICONS.pbi,
          },
          {
            title: t("Team"),
            path: '',
            icon: ICONS.team,
          },
          {
            title: t("Sprints"),
            path: '',
            icon: ICONS.sprint,
          },
          {
            title: t("Artifacts"),
            path: '',
            icon: ICONS.artifact,
          },
        ],
      },

      // Reports
      // ----------------------------------------------------------------------
      {
        subheader: t("Reports"),
        items: [
          {
            title: t("Sprint Burn Down"),
            path: '',
            icon: ICONS.report,
          },
        ],
      },

     ],
    [t, proName]
  );

  const data = dataAdmin;

  return data;
}
