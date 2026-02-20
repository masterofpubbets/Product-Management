import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { JwtLoginView } from 'src/sections/auth/jwt';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { useAuthContext } from 'src/auth/hooks';
import { OverviewAppView } from 'src/sections/overview/app/view';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
import Users from 'src/pages/administration/Users';
import NewUser from 'src/sections/user/new-user';
import Administration from 'src/pages/administration/Administrations';
import UserProfile from 'src/layouts/PM/User/UserProfile';
import ProductMenu from 'src/layouts/PM/Products/ProductMenu';
import NewProduct from 'src/layouts/PM/Products/NewProduct';
import ProductEditPage from "src/layouts/PM/Products/ProductEditPage";
import Stakeholders from "src/layouts/PM/Stakeholders/Stakeholders";
import NewStakeholder from "src/layouts/PM/Stakeholders/NewStakeholder";
import EditStakeholders from "src/layouts/PM/Stakeholders/EditStakeholders";
import Strategy from "src/layouts/PM/Strategy/Strategy";
import NewStrategy from "src/layouts/PM/Strategy/NewStrategy";
import Features from "src/layouts/PM/Features/Features";
import NewCurrentFeature from "src/layouts/PM/Features/NewCurrentFeature";
import MarketAnalysis from "src/layouts/PM/MarketAnalysis/MarketAnalysis";
import NewMarketAnalysis from "src/layouts/PM/MarketAnalysis/NewMarketAnalysis";
import TargetAud from "src/layouts/PM/TargetAud/TargetAud";
import NewTargetAud from "src/layouts/PM/TargetAud/NewTargetAud";
import BusinessModel from "src/layouts/PM/BusinessModel/BusinessModel";
import NewBusinessModel from "src/layouts/PM/BusinessModel/NewBusinessModel";
import Okr from "src/layouts/PM/Okr/Okr";
import KeyStatus from '../layouts/PM/Okr/Status/KeyStatus';
import NewStatus from 'src/layouts/PM/Okr/Status/NewStatus';
import NewObj from 'src/layouts/PM/Okr/NewObj';
import NewKeyResult from 'src/layouts/PM/Okr/NewKeyResult';


export default function AppRoute() {
  const { authenticated, user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <AuthClassicLayout>
              <JwtLoginView />
            </AuthClassicLayout>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <OverviewAppView />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/dashboard/user/profile"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <UserProfile />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/dashboard/administration"
          element={
            authenticated && user.UserGroup === 'superAdmin' ? (
              <DashboardLayout>
                {' '}
                <Administration />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />
        <Route
          exact
          path="/dashboard/users/list"
          element={
            authenticated && user.UserGroup === 'superAdmin' ? (
              <DashboardLayout>
                {' '}
                <Users />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />
        <Route
          exact
          path="/dashboard/users/new"
          element={
            authenticated && user.UserGroup === 'superAdmin' ? (
              <DashboardLayout>
                {' '}
                <NewUser />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/product"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <ProductMenu />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/product/new"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewProduct />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          path="/product/:id"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <ProductEditPage />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/stakeholders"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <Stakeholders />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/stakeholders/new"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewStakeholder />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          path="/stakeholders/:id"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <EditStakeholders />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/strategy"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <Strategy />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/strategy/new"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewStrategy />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          path="/strategy/new/:editLevel/:editGoalName"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewStrategy />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/feature/analysis"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <Features />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/feature/current/new"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewCurrentFeature />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          path="/feature/current/new/:id"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewCurrentFeature />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/ma"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <MarketAnalysis />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/ma/new"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewMarketAnalysis />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          path="/ma/new/:id"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewMarketAnalysis />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/targetaud"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <TargetAud />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/targetaud/new"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewTargetAud />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/targetaud/new/:id"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewTargetAud />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/businessmodel"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <BusinessModel />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          path="/businessmodel/new/:title/:itemname/:toedit"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewBusinessModel />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          path="/businessmodel/new/:title"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewBusinessModel />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/okr"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <Okr />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/okr/statuslist"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <KeyStatus />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          exact
          path="/okr/statuslist/new"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewStatus />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          path="/okr/statuslist/edit/:id"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewStatus />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          path="/okr/objective/new/:id"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewObj />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />

        <Route
          path="/okr/keyResult/new/:objId"
          element={
            authenticated ? (
              <DashboardLayout>
                {' '}
                <NewKeyResult />{' '}
              </DashboardLayout>
            ) : (
              <AuthClassicLayout>
                <JwtLoginView />
              </AuthClassicLayout>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
