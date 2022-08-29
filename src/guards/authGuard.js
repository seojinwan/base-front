import React from "react";
import PropTypes from "prop-types";
import useAuth from "hooks/useAuth";
import BasicSpinner from "components/spinner/basicSpinner";
import Login from "pages/login";

AuthGuard.propType = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  // 전역 값 (Context 에서 확인, 초기 값 설정 안되어있거나 로그인 안되어있을시 로그인 페이지로 이동)
  const { isInitialized, isAuthenticated } = useAuth();
  if (!isInitialized) return <BasicSpinner />;
  if (!isAuthenticated) return <Login />;

  return <>{children}</>;
}
