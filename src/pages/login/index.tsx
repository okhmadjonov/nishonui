import { Button } from "@/components/common/Button";
import { Form } from "@/components/common/Form";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services/api";
import { message } from "antd";
import { dispatch } from "@/rudex";
import IIBLogo from "../../assets/img/ng.png";
import bgImage from "../../assets/img/login.png";
import { Input } from "@/components/common/Input";

function Login() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const { isPending: isPendingMe, mutate: mutateMe } = useMutation({
    mutationFn: () => API.getUser(),
    onSuccess: (response) => {
      if (!!response) {
        dispatch.userData.changeUserData(response);
        message.success("sucsess");
      }
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => API.login(data),
    onSuccess: (response) => {
      if (!!response) {
        dispatch.auth.login({
          token: response.token,
          refreshToken: response.refreshToken,
        });
        mutateMe();
        message.success("sucsess");
      }
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  const onFinish = (data: any) => {
    mutate(data);
  };

  const isloading = isPendingMe || isPending;

  return (
    <div className={styles.login}>
      <div
        className={styles.form_container}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <div className={styles.formLeft}>
          <div className={styles.formLeftImageWrapper}>
            <img src={IIBLogo} alt="Logo" />
          </div>
        </div>
        <div className={styles.formRight}>
          <div className={styles.formRightWrapper}>
            <div className={styles.formRightWrapperTitile}>
              <h2>
                IIV Harbiy tuzulmalarning faoliyatini ta'minlash boshqarmasining <strong style={{ color: "#ff9800" }}>  <br />  e-nishon </strong>
                boshqaruv paneli.
              </h2>
            </div>

            <Form style={{ width: "80%" }} onFinish={onFinish}>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                className={styles.inputField}
                rules={[{ required: true, message: "Поля обязательно" }]}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.inputField}
                rules={[{ required: true, message: "Поля обязательно" }]}
              />
              <button type="submit" className={styles.formButton}>
                {t("auth.login")}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
