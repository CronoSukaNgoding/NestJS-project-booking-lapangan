export interface GroupPembayaran {
  id?: number;
  pembayaranID: string;
  namaPembayaran: string;
  norek?: number;
  gambar?: string;
  logo?: string;
  statusPay: number;
  status: number;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
