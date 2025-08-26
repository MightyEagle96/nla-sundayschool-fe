import { httpService } from "../httpService";

export async function getUser() {
  const { data, status } = await httpService(`auth/myprofile`);
  if (status === 200) {
    return data;
  }
  return null;
}
