import { createSignal, For, onMount, Show } from "solid-js";
import type { WorkOrder } from "../types/workOrder";
// import { ScheduleList } from '../components/schedule/ScheduleList';
import { CgExport } from "solid-icons/cg";
import { VsSearch } from "solid-icons/vs";
import { GridApi } from "ag-grid-community";
import Swal from "sweetalert2";
import DetailWOModal from "../components/ProjectPartial/ProjectDetail";
import UserManagemenetTable from "../components/ProjectPartial/ProjectTable";
import { UserMap } from "../components/ProjectPartial/UserMap";
import {
  DeleteUsersManagementAPI,
  getAllUserManagement,
} from "../services/service";
import UpdateUserModal from "../components/ProjectPartial/UpdateModal";

const BASE_URL = "http://127.0.0.1:8080/api/users";

export interface UserData {
  id: { id: { String: string } };
  username: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
  fullname: string;
  address: string;
  country: string;
  city: string;
  state: string;
  country_code: string;
  verification_status: string;
}

export default function ProjectPage() {
  const [view, setView] = createSignal<"wo" | "po">("wo");
  const [searchText, setSearchText] = createSignal("");
  const [gridApi, setGridApi] = createSignal<GridApi | any>(null);
  const [selectedData, setSelectedData] = createSignal<any>(null);
  const [showDetailModal, setShowDetailModal] = createSignal(false);
  const [showAddModal, setShowAddModal] = createSignal(false);
  const [showEditModal, setShowEditModal] = createSignal(false);
  const [rowData, setRowData] = createSignal<UserData[]>([]);
  const [form, setForm] = createSignal<Partial<UserData>>({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
    fullname: "",
    address: "",
    country: "",
    city: "",
    state: "",
    country_code: "",
    verification_status: "",
  });

  const [groups, setGroups] = createSignal<any[]>([]);

  const [refreshTrigger, setRefreshTrigger] = createSignal(0);

  onMount(() => {
    getRole();
  });

  const getAllUser = async () => {
    try {
      const response = await fetch(BASE_URL);
      console.log("Response:", response);
      if (!response.ok) throw new Error("Failed to fetch all user");
      const data = await response.json();
      const processedData = data.data.map((item: any) => ({
        id: { id: { String: item.id.id.String } },
        username: item.username,
        email: item.email,
        password: item.password,
        phone_number: item.phone_number,
        role: item.role,
        fullname: item.fullname,
        address: item.address,
        country: item.country,
        city: item.city,
        state: item.state,
        country_code: item.country_code,
        verification_status: item.verification_status,
      }));
      setRowData(processedData);
      console.log("Fetched Data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const getRole = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/groups`);
      console.log("Response:", response);
      if (!response.ok) throw new Error("Failed to fetch all groups");
      const data = await response.json();
      console.log("Fetched Data Groups :", data);
      setGroups(data.data);
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form()),
      });
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1);
        getAllUser();
        closeModal();
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const openModal = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      phone_number: "",
      role: "",
      fullname: "",
      address: "",
      country: "",
      city: "",
      state: "",
      country_code: "",
      verification_status: "",
    });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
  };

  const handleInputChange = (key: keyof UserData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    // Ambil data dari form input
  };

  const handleEdit = async () => {
    if (!form().id) return;
    try {
      const response = await fetch(`${BASE_URL}/${form()?.id?.id?.String}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form()?.username,
          email: form()?.email,
          password: form()?.password,
          phone_number: form()?.phone_number,
          role: form()?.role,
          fullname: form()?.fullname,
          address: form()?.address,
          country: form()?.country,
          city: form()?.city,
          state: form()?.state,
          country_code: form()?.country_code,
          verification_status: form()?.verification_status,
        }),
      });
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1);
        getAllUser();
        closeModal();
        alert("Data updated successfully!");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const openEditModal = (row: UserData) => {
    setForm(row);
    setShowAddModal(true);
  };

  const handleModalSuccess = () => {
    console.log("refreshTrigger", refreshTrigger());
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    // Pass the grid API reference to the table component
    // console.log('gridApi', gridApi());
    gridApi()?.setQuickFilter(value);
  };

  const handleGridReady = (api: any) => {
    setGridApi(api);
  };
  const exportTable = () => {
    gridApi()?.exportDataAsExcel();
  };

  const handleDelete = async (data: any) => {
    console.log("data", data);
    setSelectedData(data);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await DeleteUsersManagementAPI(data.id.id.String);
          Swal.fire({
            title: "Deleted!",
            text: "Project has been deleted.",
            icon: "success",
          });
          // Refresh table after successful deletion
          setRefreshTrigger((prev) => prev + 1);
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete user.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleResetPassword = async (data: any) => {
    console.log("Reset password for:", data);
    setSelectedData(data);

    // Menampilkan form input untuk memasukkan password baru
    Swal.fire({
      title: "Enter New Password",
      html: `
                <input type="password" id="newPassword" class="swal2-input" placeholder="New Password" />
                <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm Password" />
            `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reset Password",
      preConfirm: () => {
        const newPassword = (
          document.getElementById("newPassword") as HTMLInputElement
        ).value;
        const confirmPassword = (
          document.getElementById("confirmPassword") as HTMLInputElement
        ).value;

        // Validasi password
        if (!newPassword || !confirmPassword) {
          Swal.showValidationMessage("Please enter both password fields.");
          return false;
        }

        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage("Passwords do not match.");
          return false;
        }

        return { newPassword };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        // const { newPassword } = result.value;
        // try {
        //     // Memanggil API untuk mereset password
        //     await ResetPasswordAPI(data.id, newPassword);
        //     Swal.fire({
        //         title: "Success!",
        //         text: "Password has been reset.",
        //         icon: "success"
        //     });
        //     setRefreshTrigger(prev => prev + 1);
        // } catch (error) {
        //     console.error('Error resetting password:', error);
        //     Swal.fire({
        //         title: "Error!",
        //         text: "Failed to reset password.",
        //         icon: "error"
        //     });
        // }
      }
    });
  };

  const handleDetail = (data: any) => {
    console.log("Detail data in WorkOrder:", data);
    setSelectedData(data);
    setShowDetailModal(true);
  };

  const summaryInfor: {
    title: string;
    value: string;
    description: string;
    change: string;
    trend: string;
    color: string;
    bgColor: string;
    icon: any;
  }[] = [
    {
      title: "Total User",
      value: "1923",
      // subValue: "Rp. 50 M",
      description: "increase from last month",
      change: "12%",
      trend: "down",
      color: "#FF4480",
      bgColor: "#FF448029",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8"
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4.00751 9.2376C4.0092 9.27146 4.00399 9.30532 3.99219 9.33711C3.98039 9.3689 3.96224 9.39795 3.93885 9.42251C3.91547 9.44706 3.88733 9.46661 3.85616 9.47994C3.82498 9.49328 3.79142 9.50014 3.75751 9.5001H1.00001C0.887154 9.50027 0.777562 9.46226 0.689053 9.39224C0.600543 9.32223 0.538322 9.22433 0.512507 9.11447C0.496432 9.03928 0.497174 8.96146 0.514677 8.88658C0.53218 8.8117 0.566014 8.74162 0.613757 8.68134C1.05489 8.09633 1.64019 7.63572 2.31251 7.34447C2.01734 7.07535 1.79095 6.73941 1.6523 6.36481C1.51366 5.9902 1.4668 5.58782 1.51564 5.19138C1.56448 4.79493 1.70761 4.41596 1.93303 4.08621C2.15845 3.75646 2.45961 3.48552 2.81127 3.29608C3.16294 3.10665 3.55488 3.00424 3.95426 2.99743C4.35364 2.99062 4.74885 3.07961 5.10676 3.25695C5.46468 3.43428 5.7749 3.6948 6.01143 4.01667C6.24797 4.33855 6.40393 4.71242 6.46626 5.10697C6.4743 5.16003 6.4648 5.21426 6.43919 5.26142C6.41358 5.30858 6.37327 5.34608 6.32438 5.36822C5.63088 5.68883 5.04355 6.20112 4.6317 6.84464C4.21985 7.48817 4.00066 8.23607 4.00001 9.0001C4.00001 9.0801 4.00001 9.15885 4.00751 9.2376ZM15.3825 8.68072C14.9424 8.09639 14.3584 7.63602 13.6875 7.34447C13.9827 7.07535 14.2091 6.73941 14.3477 6.36481C14.4864 5.9902 14.5332 5.58782 14.4844 5.19138C14.4355 4.79493 14.2924 4.41596 14.067 4.08621C13.8416 3.75646 13.5404 3.48552 13.1887 3.29608C12.8371 3.10665 12.4451 3.00424 12.0458 2.99743C11.6464 2.99062 11.2512 3.07961 10.8932 3.25695C10.5353 3.43428 10.2251 3.6948 9.98858 4.01667C9.75205 4.33855 9.59608 4.71242 9.53376 5.10697C9.52571 5.16003 9.53521 5.21426 9.56082 5.26142C9.58643 5.30858 9.62675 5.34608 9.67563 5.36822C10.3691 5.68883 10.9565 6.20112 11.3683 6.84464C11.7802 7.48817 11.9993 8.23607 12 9.0001C12 9.0801 12 9.15885 11.9925 9.2376C11.9908 9.27146 11.996 9.30532 12.0078 9.33711C12.0196 9.3689 12.0378 9.39795 12.0612 9.42251C12.0845 9.44706 12.1127 9.46661 12.1439 9.47994C12.175 9.49328 12.2086 9.50014 12.2425 9.5001H15C15.1129 9.50027 15.2225 9.46226 15.311 9.39224C15.3995 9.32223 15.4617 9.22433 15.4875 9.11447C15.5037 9.03914 15.5029 8.96115 15.4853 8.88615C15.4677 8.81114 15.4337 8.74098 15.3856 8.68072H15.3825ZM9.82001 11.3795C10.3178 10.9982 10.6837 10.4705 10.8662 9.87057C11.0486 9.27063 11.0385 8.6286 10.8372 8.03471C10.6359 7.44083 10.2536 6.92495 9.74395 6.55957C9.23432 6.1942 8.62301 5.99771 7.99594 5.99771C7.36887 5.99771 6.75757 6.1942 6.24794 6.55957C5.73832 6.92495 5.35599 7.44083 5.1547 8.03471C4.95342 8.6286 4.94328 9.27063 5.12573 9.87057C5.30818 10.4705 5.67404 10.9982 6.17188 11.3795C5.28847 11.7622 4.5508 12.4178 4.06688 13.2501C4.02299 13.3261 3.99989 13.4123 3.99989 13.5001C3.9999 13.5879 4.02301 13.6741 4.06691 13.7501C4.11081 13.8262 4.17394 13.8893 4.24997 13.9332C4.32599 13.977 4.41223 14.0001 4.50001 14.0001H11.5C11.5878 14.0001 11.674 13.977 11.75 13.9332C11.8261 13.8893 11.8892 13.8262 11.9331 13.7501C11.977 13.6741 12.0001 13.5879 12.0001 13.5001C12.0001 13.4123 11.977 13.3261 11.9331 13.2501C11.4482 12.4172 10.7091 11.7616 9.82438 11.3795H9.82001Z" />
        </svg>
      ),
    },
    {
      title: "New User",
      value: "345",
      // subValue: "Rp. 50 M",
      description: "increase from last month",
      change: "12%",
      trend: "down",
      color: "#9482FE",
      bgColor: "#9482FE29",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M6.46193 0.0959473C4.60531 0.0959473 3.11546 1.37102 3.11546 3.80795C3.11546 5.39933 3.74931 7.02026 4.71177 8.01902C5.08716 9.01779 4.41023 9.38949 4.26993 9.44241C2.32716 10.155 0.0576172 11.4473 0.0576172 12.731V13.211C0.0576172 14.9606 3.38931 15.3649 6.48039 15.3649C7.15411 15.3635 7.82756 15.338 8.49946 15.2886C7.65814 14.4006 7.19021 13.2232 7.19239 11.9999C7.19239 10.8978 7.56777 9.88795 8.19177 9.07687C8.09946 8.86026 8.06254 8.51872 8.23054 7.99995C9.18746 6.99995 9.80777 5.39318 9.80777 3.80733C9.80777 1.37102 8.31608 0.0965627 6.46131 0.0965627L6.46193 0.0959473ZM12.0004 8.11502C10.9701 8.11502 9.98206 8.5243 9.25355 9.2528C8.52504 9.98131 8.11577 10.9694 8.11577 11.9996C8.11577 13.0299 8.52504 14.018 9.25355 14.7465C9.98206 15.475 10.9701 15.8843 12.0004 15.8843C13.0307 15.8843 14.0187 15.475 14.7472 14.7465C15.4757 14.018 15.885 13.0299 15.885 11.9996C15.885 10.9694 15.4757 9.98131 14.7472 9.2528C14.0187 8.5243 13.0307 8.11502 12.0004 8.11502ZM11.4619 9.8461H12.5388V11.4424H14.1352V12.5575H12.5388V14.1538H11.4619V12.5575H9.84654V11.4424H11.4619V9.8461Z" />
        </svg>
      ),
    },
    {
      title: "Active User",
      value: "1021",
      // subValue: "Rp. 50 M",
      description: "increase from last month",
      change: "12%",
      trend: "down",
      color: "#0ED8AF",
      bgColor: "#0ED8AF29",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          width="24"
          height="24"
          viewBox="0 0 16 13"
          fill="currentColor"
        >
          <path d="M5.6 6.4C7.3675 6.4 8.8 4.9675 8.8 3.2C8.8 1.4325 7.3675 0 5.6 0C3.8325 0 2.4 1.4325 2.4 3.2C2.4 4.9675 3.8325 6.4 5.6 6.4ZM7.84 7.2H7.4225C6.8675 7.455 6.25 7.6 5.6 7.6C4.95 7.6 4.335 7.455 3.7775 7.2H3.36C1.505 7.2 0 8.705 0 10.56V11.6C0 12.2625 0.5375 12.8 1.2 12.8H10C10.6625 12.8 11.2 12.2625 11.2 11.6V10.56C11.2 8.705 9.695 7.2 7.84 7.2ZM15.915 3.99L15.22 3.2875C15.105 3.17 14.9175 3.17 14.8 3.285L12.18 5.885L11.0425 4.74C10.9275 4.6225 10.74 4.6225 10.6225 4.7375L9.92 5.435C9.8025 5.55 9.8025 5.7375 9.9175 5.855L11.96 7.9125C12.075 8.03 12.2625 8.03 12.38 7.915L15.9125 4.41C16.0275 4.2925 16.03 4.105 15.915 3.99Z" />
        </svg>
      ),
    },
    {
      title: "Inactive User",
      value: "901",
      // subValue: "Rp. 50 M",
      description: "increase from last month",
      change: "12%",
      trend: "down",
      color: "#FFD700",
      bgColor: "#FFD70029",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M7.33301 1.33325C6.44895 1.33325 5.60111 1.68444 4.97599 2.30956C4.35086 2.93468 3.99967 3.78253 3.99967 4.66658C3.99967 5.55064 4.35086 6.39849 4.97599 7.02361C5.60111 7.64873 6.44895 7.99992 7.33301 7.99992C8.21706 7.99992 9.06491 7.64873 9.69003 7.02361C10.3152 6.39849 10.6663 5.55064 10.6663 4.66658C10.6663 3.78253 10.3152 2.93468 9.69003 2.30956C9.06491 1.68444 8.21706 1.33325 7.33301 1.33325ZM7.33301 8.66658C5.73634 8.66658 4.28301 9.12925 3.21434 9.78125C2.68101 10.1066 2.22501 10.4906 1.89567 10.9079C1.57167 11.3173 1.33301 11.8086 1.33301 12.3333C1.33301 12.8966 1.60701 13.3406 2.00167 13.6573C2.37501 13.9573 2.86767 14.1559 3.39101 14.2946C4.44301 14.5726 5.84701 14.6666 7.33301 14.6666C7.48679 14.6666 7.63901 14.6655 7.78967 14.6633C7.90133 14.6617 8.0108 14.6322 8.10806 14.5773C8.20532 14.5224 8.28723 14.444 8.3463 14.3493C8.40536 14.2545 8.43967 14.1464 8.44608 14.0349C8.4525 13.9235 8.43081 13.8122 8.38301 13.7113C8.13021 13.1762 7.99929 12.5917 7.99967 11.9999C7.99967 11.1653 8.25501 10.3919 8.69101 9.75125C8.75582 9.65604 8.79485 9.54567 8.80432 9.43089C8.81378 9.31611 8.79334 9.20083 8.745 9.0963C8.69666 8.99176 8.62207 8.90154 8.52848 8.83441C8.4349 8.76728 8.32552 8.72554 8.21101 8.71325C7.9239 8.68214 7.63123 8.66658 7.33301 8.66658ZM11.057 10.1146C10.9313 9.99315 10.7629 9.92595 10.5881 9.92747C10.4133 9.92899 10.2461 9.9991 10.1225 10.1227C9.99886 10.2463 9.92874 10.4135 9.92723 10.5883C9.92571 10.7631 9.9929 10.9315 10.1143 11.0573L11.057 11.9999L10.1143 12.9426C10.0507 13.0041 9.99988 13.0776 9.96494 13.159C9.93 13.2403 9.91161 13.3278 9.91084 13.4163C9.91007 13.5048 9.92694 13.5926 9.96046 13.6746C9.99398 13.7565 10.0435 13.8309 10.1061 13.8935C10.1687 13.9561 10.2431 14.0056 10.325 14.0391C10.407 14.0727 10.4948 14.0895 10.5833 14.0888C10.6718 14.088 10.7593 14.0696 10.8406 14.0347C10.9219 13.9997 10.9955 13.9489 11.057 13.8853L11.9997 12.9426L12.9423 13.8853C13.0038 13.9489 13.0774 13.9997 13.1587 14.0347C13.2401 14.0696 13.3276 14.088 13.4161 14.0888C13.5046 14.0895 13.5924 14.0727 13.6743 14.0391C13.7562 14.0056 13.8307 13.9561 13.8933 13.8935C13.9559 13.8309 14.0054 13.7565 14.0389 13.6746C14.0724 13.5926 14.0893 13.5048 14.0885 13.4163C14.0877 13.3278 14.0693 13.2403 14.0344 13.159C13.9995 13.0776 13.9487 13.0041 13.885 12.9426L12.9423 11.9999L13.885 11.0573C14.0064 10.9315 14.0736 10.7631 14.0721 10.5883C14.0706 10.4135 14.0005 10.2463 13.8769 10.1227C13.7533 9.9991 13.5861 9.92899 13.4113 9.92747C13.2365 9.92595 13.0681 9.99315 12.9423 10.1146L11.9997 11.0573L11.057 10.1146Z" />
        </svg>
      ),
    },
  ];

  const [activeTab, setActiveTab] = createSignal("All");
  const [activeStatusTab, setActivStatusTab] = createSignal("All");

  const tabs = ["All", "Admin", "User", "Supervisor"];
  // const renderContent = () => {
  //   switch (activeTab()) {
  //     case "All":
  //       return <p>Displaying all users</p>;
  //     case "Admin":
  //       return <p>Displaying admin users</p>;
  //     case "User":
  //       return <p>Displaying general users</p>;
  //     case "Supervisor":
  //       return <p>Displaying supervisor users</p>;
  //     default:
  //       return <p>No data available</p>;
  //   }
  // };

  const applyRoleFilter = (role: string) => {
    const api = gridApi();
    if (api) {
      if (role === "All") {
        api.setFilterModel(null); // Hapus filter
      } else {
        api.setFilterModel({
          role_name: {
            filterType: "text",
            type: "equals",
            filter: role,
          },
        });
      }
      api.onFilterChanged();
    }
  };

  const applyVerificationStatusFilter = (verification_status: string) => {
    const api = gridApi();
    if (api) {
      if (verification_status === "All") {
        api.setFilterModel(null); // Hapus filter
      } else {
        api.setFilterModel({
          verification_status: {
            filterType: "text",
            type: "equals",
            filter: verification_status,
          },
        });
      }
      api.onFilterChanged();
    }
  };

  const statusTabs = ["All", "Active", "Inactive"];

  return (
    <>
      <div class="min-h-screen space-y-0  space-x-6 flex flex-col">
        <div class="space-x-6 flex flex-row mt-12 m-6">
          <div class="w-3/5 grid grid-cols-2 gap-6">
            {summaryInfor.map((item, index) => (
              <div class="bg-white rounded-2xl p-6 space-y-3 flex flex-row space-x-3 justify-between">
                <div class="flex flex-col space-y-3 my-auto">
                  <div class="flex items-center space-x-3 ">
                    <div
                      class="bg-gray-100 rounded-full p-[3vh] w-2 h-10 flex items-center justify-center flex flex row"
                      style={{ background: item.bgColor }}
                    >
                      <div
                        class="text-white flex items-center justify-center"
                        style={{ color: item.color }}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <h3 class="text-[2vh] font-inter font-medium text-[#171717]">
                      {item.title}
                    </h3>
                  </div>
                  <div class="flex flex-col space-y-0">
                    <div class="flex gap-2 items-center">
                      <h3 class="text-[4vh] font-inter font-semibold text-black">
                        {item.value}
                      </h3>
                      {/* <span class="text-[2vh] font-inter font-semibold text-black">/</span> */}
                      {/* <h3 class="text-[2vh] font-inter font-semibold text-black">{item.subValue}</h3> */}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col">
                  <div class="flex gap-3 items-left font-inter flex-col my-auto">
                    <div class="flex flex-row items-center gap-3">
                      <Show
                        when={item.trend === "up"}
                        fallback={
                          <svg
                            width="49"
                            height="37"
                            viewBox="0 0 49 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 36.5L10.8087 23.2745L16.5304 28.1471L27.9739 13.5294L35.7391 21.1863L48 1"
                              stroke="#11D600"
                            />
                            <path
                              d="M10.8087 23.2745L1 36.5H48V1L35.7391 21.1863L27.9739 13.5294L16.5304 28.1471L10.8087 23.2745Z"
                              fill="url(#paint0_linear_60_460)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_60_460"
                                x1="24.5"
                                y1="1"
                                x2="24.5"
                                y2="36.5"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#11D600" stop-opacity="0.5" />
                                <stop
                                  offset="1"
                                  stop-color="#11D600"
                                  stop-opacity="0.01"
                                />
                              </linearGradient>
                            </defs>
                          </svg>
                        }
                      >
                        <div class="text-green-500 font-bold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M6 18L18 6m0 0H9m9 0v9"
                            />
                          </svg>
                        </div>
                      </Show>
                      <p class="text-[2vh] font-inter text-black">
                        {item.change}
                      </p>
                    </div>
                    <p class="text-[1.5vh] font-inter text-black">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class="w-2/5">
            <UserMap />
          </div>
        </div>
        <div class="font-inter bg-white  rounded-2xl shadow-sm  m-6 w-[97%] h-full">
          <div class="space-y-4 p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div>
                  <div class="flex items-center gap-2">
                    <h1 class="text-md font-semibold font-inter text-gray-900">
                      All Users
                    </h1>
                    <span class="text-[1.5vh] font-inter text-[#FF934F] bg-[#FF934F29] px-2 py-1 rounded-full font-inter">
                      Label Text
                    </span>
                  </div>
                  <p class="text-sm font-inter text-gray-500 mt-2">
                    displays a complete list of all users{" "}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <button
                  onclick={exportTable}
                  class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M6 0C2.69 0 0 2.69 0 6c0 2.35 1.35 4.39 3.32 5.37c.321.16.676-.089.676-.448a.56.56 0 0 0-.307-.487a5.002 5.002 0 1 1 7.14-5.74a.5.5 0 0 0 .581.36q.287-.058.591-.058c1.66 0 3 1.34 3 3s-1.34 3-3 3h-.5a.5.5 0 0 0 0 1h.5c2.21 0 4-1.79 4-4a4 4 0 0 0-4.337-3.986a6 6 0 0 0-5.66-4.01z"
                    />
                    <path
                      fill="currentColor"
                      d="M7.5 7a.5.5 0 0 1 .5.5v6.79l1.15-1.15a.5.5 0 0 1 .707.707l-2 2a.5.5 0 0 1-.351.146H7.5a.5.5 0 0 1-.35-.146l-2-2a.5.5 0 0 1 .707-.707l1.15 1.15V7.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                  Export
                </button>

                <button
                  onClick={openModal}
                  class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF934F] rounded-lg hover:bg-blue-700"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add New
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 p-1 bg-[#F2F2F2] rounded-lg">
                  {tabs.map((tab) => (
                    <button
                      class={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out ${
                        activeTab() === tab
                          ? "text-gray-900 bg-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => {
                        setActiveTab(tab);
                        applyRoleFilter(tab);
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {/* <div>
                                    {renderContent()}
                                </div> */}
                <div class="flex items-center gap-2 p-1 bg-[#F2F2F2] rounded-lg">
                  {statusTabs.map((tab) => (
                    <button
                      class={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out relative  ${
                        activeStatusTab() === tab
                          ? "text-gray-900 bg-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => {
                        setActivStatusTab(tab);
                        applyVerificationStatusFilter(tab);
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchText()}
                    onInput={handleSearch}
                    placeholder="Search"
                    class="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M4.5 7.25h15M7.385 12h9.23m-6.345 4.75h3.46"
                    />
                  </svg>
                  Filters
                </button>
              </div>
            </div>
          </div>

          <div class="w-full h-full pl-6 pr-6">
            <UserManagemenetTable
              onEdit={openEditModal}
              onDelete={handleDelete}
              onDetail={handleDetail}
              onResetPassword={handleResetPassword}
              onGridReady={(api) => setGridApi(api)}
              refreshData={refreshTrigger()}
            />
          </div>
          {/* Show modal untuk edit */}
          {/* <Show when={showEditModal()}>
                        <UpdateUserModal
                        data={selectedData() as UserData}
                        onClose={() => setShowEditModal(false)}
                        onSuccess={handleModalSuccess}
                        />
                    </Show> 
          {/* Modal */}
          {showAddModal() && (
            <div
              class="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50"
              aria-hidden="true"
            >
              <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      {form()?.id ? "Edit User" : "Add New User"}
                    </h3>
                  </div>
                  <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Username
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.username || ""}
                        onChange={(e) =>
                          handleInputChange("username", e.currentTarget.value)
                        }
                      />
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.currentTarget.value)
                        }
                      />
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.password || ""}
                        onChange={(e) =>
                          handleInputChange("password", e.currentTarget.value)
                        }
                      />
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.phone_number || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "phone_number",
                            e.currentTarget.value
                          )
                        }
                      />
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Role
                      </label>
                      <select
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.role || ""}
                        onChange={(e) =>
                          handleInputChange("role", e.currentTarget.value)
                        }
                      >
                        <option value="" disabled selected>
                          select role
                        </option>
                        <For each={groups()}>
                          {(cat, i) => (
                            <>
                              <option value={cat.id.id.String}>
                                {cat.role_name}
                              </option>
                            </>
                          )}
                        </For>
                      </select>
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Full Name
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.fullname || ""}
                        onChange={(e) =>
                          handleInputChange("fullname", e.currentTarget.value)
                        }
                      />
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Address
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.address || ""}
                        onChange={(e) =>
                          handleInputChange("address", e.currentTarget.value)
                        }
                      />
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Country
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.country || ""}
                        onChange={(e) =>
                          handleInputChange("country", e.currentTarget.value)
                        }
                      />
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        City
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.city || ""}
                        onChange={(e) =>
                          handleInputChange("city", e.currentTarget.value)
                        }
                      />
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        State
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.state || ""}
                        onChange={(e) =>
                          handleInputChange("state", e.currentTarget.value)
                        }
                      />
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Country Code
                      </label>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.country_code || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "country_code",
                            e.currentTarget.value
                          )
                        }
                      />
                    </div>
                    <div class="mt-4">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Verification Status
                      </label>
                      <select
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={form()?.verification_status || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "verification_status",
                            e.currentTarget.value
                          )
                        }
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div class="mt-6 flex justify-end">
                    <button
                      onClick={closeModal}
                      class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={form()?.id ? handleEdit : handleAddUser}
                      class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
