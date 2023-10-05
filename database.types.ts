import {PostgrestError} from "@supabase/supabase-js";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      favorite_walks: {
        Row: {
          created_at: string
          user_id: string
          walk_id: number
        }
        Insert: {
          created_at?: string
          user_id?: string
          walk_id: number
        }
        Update: {
          created_at?: string
          user_id?: string
          walk_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "favorite_walks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_walks_walk_id_fkey"
            columns: ["walk_id"]
            referencedRelation: "walks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_walks_walk_id_fkey"
            columns: ["walk_id"]
            referencedRelation: "next_walks"
            referencedColumns: ["id"]
          }
        ]
      }
      walks: {
        Row: {
          activity: Database["public"]["Enums"]["walk_activity"]
          adep_sante: boolean
          be_wapp: boolean
          bike: boolean
          contact_first_name: string
          contact_last_name: string
          contact_phone_number: string | null
          created_at: string
          date: string
          entity: string
          extra_orientation: boolean
          extra_walk: boolean
          fifteen_km: boolean
          guided: boolean
          id: number
          ign: string | null
          latitude: number
          locality: string
          longitude: number
          meeting_point: string
          meeting_point_info: string | null
          mountain_bike: boolean
          organizer: string
          province: string
          status: Database["public"]["Enums"]["walk_status"]
          stroller: boolean
          transport: string | null
          updated_at: string
          water_supply: boolean
          wheelchair: boolean
        }
        Insert: {
          activity: Database["public"]["Enums"]["walk_activity"]
          adep_sante?: boolean
          be_wapp?: boolean
          bike?: boolean
          contact_first_name: string
          contact_last_name: string
          contact_phone_number?: string | null
          created_at?: string
          date: string
          entity: string
          extra_orientation?: boolean
          extra_walk?: boolean
          fifteen_km?: boolean
          guided?: boolean
          id: number
          ign?: string | null
          latitude: number
          locality: string
          longitude: number
          meeting_point: string
          meeting_point_info?: string | null
          mountain_bike?: boolean
          organizer: string
          province: string
          status: Database["public"]["Enums"]["walk_status"]
          stroller?: boolean
          transport?: string | null
          updated_at?: string
          water_supply?: boolean
          wheelchair?: boolean
        }
        Update: {
          activity?: Database["public"]["Enums"]["walk_activity"]
          adep_sante?: boolean
          be_wapp?: boolean
          bike?: boolean
          contact_first_name?: string
          contact_last_name?: string
          contact_phone_number?: string | null
          created_at?: string
          date?: string
          entity?: string
          extra_orientation?: boolean
          extra_walk?: boolean
          fifteen_km?: boolean
          guided?: boolean
          id?: number
          ign?: string | null
          latitude?: number
          locality?: string
          longitude?: number
          meeting_point?: string
          meeting_point_info?: string | null
          mountain_bike?: boolean
          organizer?: string
          province?: string
          status?: Database["public"]["Enums"]["walk_status"]
          stroller?: boolean
          transport?: string | null
          updated_at?: string
          water_supply?: boolean
          wheelchair?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      distinct_walk_dates: {
        Row: {
          date: string | null
        }
        Relationships: []
      }
      next_walks: {
        Row: {
          activity: Database["public"]["Enums"]["walk_activity"] | null
          adep_sante: boolean | null
          be_wapp: boolean | null
          bike: boolean | null
          contact_first_name: string | null
          contact_last_name: string | null
          contact_phone_number: string | null
          created_at: string | null
          date: string | null
          entity: string | null
          extra_orientation: boolean | null
          extra_walk: boolean | null
          fifteen_km: boolean | null
          guided: boolean | null
          id: number | null
          ign: string | null
          latitude: number | null
          locality: string | null
          longitude: number | null
          meeting_point: string | null
          meeting_point_info: string | null
          mountain_bike: boolean | null
          organizer: string | null
          province: string | null
          status: Database["public"]["Enums"]["walk_status"] | null
          stroller: boolean | null
          transport: string | null
          updated_at: string | null
          water_supply: boolean | null
          wheelchair: boolean | null
        }
        Insert: {
          activity?: Database["public"]["Enums"]["walk_activity"] | null
          adep_sante?: boolean | null
          be_wapp?: boolean | null
          bike?: boolean | null
          contact_first_name?: string | null
          contact_last_name?: string | null
          contact_phone_number?: string | null
          created_at?: string | null
          date?: string | null
          entity?: string | null
          extra_orientation?: boolean | null
          extra_walk?: boolean | null
          fifteen_km?: boolean | null
          guided?: boolean | null
          id?: number | null
          ign?: string | null
          latitude?: number | null
          locality?: string | null
          longitude?: number | null
          meeting_point?: string | null
          meeting_point_info?: string | null
          mountain_bike?: boolean | null
          organizer?: string | null
          province?: string | null
          status?: Database["public"]["Enums"]["walk_status"] | null
          stroller?: boolean | null
          transport?: string | null
          updated_at?: string | null
          water_supply?: boolean | null
          wheelchair?: boolean | null
        }
        Update: {
          activity?: Database["public"]["Enums"]["walk_activity"] | null
          adep_sante?: boolean | null
          be_wapp?: boolean | null
          bike?: boolean | null
          contact_first_name?: string | null
          contact_last_name?: string | null
          contact_phone_number?: string | null
          created_at?: string | null
          date?: string | null
          entity?: string | null
          extra_orientation?: boolean | null
          extra_walk?: boolean | null
          fifteen_km?: boolean | null
          guided?: boolean | null
          id?: number | null
          ign?: string | null
          latitude?: number | null
          locality?: string | null
          longitude?: number | null
          meeting_point?: string | null
          meeting_point_info?: string | null
          mountain_bike?: boolean | null
          organizer?: string | null
          province?: string | null
          status?: Database["public"]["Enums"]["walk_status"] | null
          stroller?: boolean | null
          transport?: string | null
          updated_at?: string | null
          water_supply?: boolean | null
          wheelchair?: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      max_walk_updated_at: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      walk_activity: "walk" | "orientation"
      walk_status: "ok" | "modified" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError