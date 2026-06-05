import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("Sebelum Viral Chapter 1 MVP flow", () => {
  it("lets the player build the contradiction path with choice feedback and publish a careful clarification", async () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Sebelum Viral" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Mulai Chapter 1" }));

    fireEvent.click(screen.getByRole("button", { name: "Lanjut" }));
    fireEvent.click(screen.getByRole("button", { name: "Kita cek sumbernya dulu." }));
    for (let step = 0; step < 5; step += 1) {
      fireEvent.click(screen.getByRole("button", { name: "Lanjut" }));
    }

    expect(screen.getByText("Story Anonim Aldi")).toBeInTheDocument();
    expect(screen.getByText("Jadwal Latihan Basket")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Buka Detective Board" }));
    fireEvent.change(screen.getByLabelText("Evidence A"), { target: { value: "EV_CH1_002" } });
    fireEvent.change(screen.getByLabelText("Evidence B"), { target: { value: "EV_CH1_009" } });
    fireEvent.click(screen.getByRole("button", { name: "Hubungkan Bukti" }));

    expect(screen.getByText("Kontradiksi Waktu dan Lokasi")).toBeInTheDocument();
    expect(screen.getByText(/jadwal latihan menunjukkan Aldi berada di lapangan/)).toBeInTheDocument();
    expect(screen.getByText("Rute konfrontasi terbuka")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Periksa Klaim Aldi" }));
    expect(screen.getByText(/melemahkan klaim lokasi dan waktu/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Konfrontasi Aldi" }));
    expect(screen.getByText(/Aku bisa jelasin bagian waktunya/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Keputusan Editorial" }));
    fireEvent.click(screen.getByRole("button", { name: /Terbitkan klarifikasi sementara/ }));

    expect(screen.getByRole("heading", { name: "Klarifikasi Hati-hati" })).toBeInTheDocument();
    expect(screen.getByText("Kamu memisahkan klaim, bukti, dan batas pengetahuan.")).toBeInTheDocument();
    expect(screen.getByText("Jejak keputusan")).toBeInTheDocument();
    expect(screen.getByText("Kita cek sumbernya dulu.")).toBeInTheDocument();
  });

  it("keeps confrontation locked when the player connects repeated rumor evidence", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Mulai Chapter 1" }));

    for (let step = 0; step < 6; step += 1) {
      fireEvent.click(screen.getByRole("button", { name: "Lanjut" }));
    }

    fireEvent.click(screen.getByRole("button", { name: "Buka Detective Board" }));
    fireEvent.change(screen.getByLabelText("Evidence A"), { target: { value: "EV_CH1_003" } });
    fireEvent.change(screen.getByLabelText("Evidence B"), { target: { value: "EV_CH1_008" } });
    fireEvent.click(screen.getByRole("button", { name: "Hubungkan Bukti" }));

    expect(screen.getByText("Korelasi Lemah")).toBeInTheDocument();
    expect(screen.getByText("Rute belum terbuka")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Periksa Klaim Aldi" })).toBeDisabled();
  });
});
