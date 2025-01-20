export interface AuditData {
    id: number;
    username: string;
    actvity: string;
    timestamp: string;
    details: string;
}

export interface UserData {
    id: number;
    username: string;
    password?: string;
    full_name: string;
    email: string;
    phone_number: string;
    role_id: number;
    area_assigned_id: number;
    team_id: number;
    employee_id: string;
    status: string;
    date_of_birth: string;
    join_date: string;
    last_login: string;
    gender: string;
    address: string;
    profile_picture?: string;
    notes: string;
    role: string;
    team_name: string;
    assigned_areas: string[];
}

export interface CreateUserRequest {
    user: UserData;
    area_ids: number[];
}

export interface CreateProjectRequest {
    po_id: string,
    wo_id: string,
    project_type_id: number,
    regional: number,
    witel: number,
    psa: number,
    pic: number,
    unit: string,
    cable_volume: number,
    pole: number,
    port: number,
    service_price: number,
    material_price: number,
    inc_material_price: number,
    deploy_service_price: number,
    description: string,
    attachment_path: string,
    service: boolean,
    material: boolean,
    status: string,
    phase: string,
    survey_md_doc: string,
    wo_doc: string,
    po_doc: string,

    id?: number,


    location?: string,
    team_name?: string,

}



export interface DataTableProject {
    attachment_path: string
    cable_volume: number,
    deploy_service_price: number,
    description: string,
    id: number,
    inc_material_price: number,
    material: boolean,
    material_price: number,
    phase: string,
    po_doc: string,
    po_id: string,
    pole: number,
    port: number,
    project_type: string,
    project_type_id: number,
    psa: string,
    psa_id: number,
    region_id: number,
    regional: string,
    regional_id: number,
    service: boolean,
    service_price: number,
    status: string,
    survey_md_doc: string
    unit: string,
    witel: string,
    witel_id: number,
    wo_doc: string,
    wo_id: string
}
