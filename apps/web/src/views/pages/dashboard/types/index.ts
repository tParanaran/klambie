import { IconType } from "react-icons";

export interface ISidebarItem {
  title: string;                  
  Icon?: IconType;    
  path: string;                   
  badge?: number;                 
  dropdown?: ISidebarItem[];       
}