import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { Layout } from '@/views/layout';
/* Rutas */
import { AuthPage } from '@/views/auth/AuthPage';
import { DashboardView } from '@/views/pages/dashboard';
import { ReportView } from '@/views/pages/report';
import { TeacherView } from '@/views/pages/teacher';
import { StudentView } from '@/views/pages/student';
import { InscriptionView } from '@/views/pages/inscription';
import { PermissionView } from '@/views/pages/permission';
import { RoleView } from '@/views/pages/role';
import { BranchView } from '@/views/pages/branch';
import { RoomView } from '@/views/pages/room';
import { StaffView } from '@/views/pages/staff';
import { MonthlyFeeView } from '@/views/pages/pay/monthlyfee';
import { TutorView } from '@/views/pages/tutor';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    (status === 'not-authenticated') ?
      <AuthPage />
      :
      <Layout>
        <Routes>
          <Route path='/dashboardView' element={<DashboardView />} />
          <Route path='/branchView' element={<BranchView />} />
          
          <Route path='/roomView' element={<RoomView />} />
          
          
          <Route path='/inscriptionView' element={<InscriptionView />} />
          <Route path='/roleView' element={<RoleView />} />
          <Route path='/permissionView' element={<PermissionView />} />
          <Route path='/teacherView' element={<TeacherView />} />
          <Route path='/staffView' element={<StaffView />} />
          <Route path='/studentView' element={<StudentView />} />
          <Route path='/tutorView' element={<TutorView />} />
          
          <Route path='/pagos' element={<MonthlyFeeView />} />

          <Route path='/ReportView' element={<ReportView />} />

          {/*  */}
          <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
        </Routes>
      </Layout>
  )
}
