import { CbiQuantitative, CbiQuantitativeQuestionType } from "./interface";

export const CBI_QUANTITATIVE_CONTAINER_ID = "cbi-quantitative-container";
export const CBI_QUANTITATIVE: CbiQuantitative[] = [
  {
    code: 1,
    title: "PHÁT THẢI MÊ-TAN TỪ CANH TÁC LÚA",
    questions: [
      {
        code: "SFw",
        title:
          "1. Doanh nghiệp của anh/chị sử dụng biện pháp quản lý nước nào trong canh tác lúa ?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_select,
            input1: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
            select1: {
              placeholder: "Chọn đáp án",
              code: "X",
              options: [
                {
                  label:
                    "A. Để ruộng ngập nước thường xuyên, chỉ tháo nước trước khi thu hoạch (CF - Continous flooding irrigation)",
                  value: 1,
                },
                {
                  label:
                    "B.  Rút nước giữa vụ (5-7 ngày) vào cuối thời kỳ đẻ nhánh (MS-Mid season drainage)",
                  value: 0.6,
                },
                {
                  label:
                    "C. Tưới nước khô ẩm xen kẽ (AWD-Alternative wetting and drying)- Rút nước nhiều hơn 2 lần/vụ lúa",
                  value: 0.52,
                },
              ],
            },
            label: "Vụ Đông Xuân",
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_select,
            input1: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
            select1: {
              placeholder: "Chọn đáp án",
              code: "X",
              options: [
                {
                  label:
                    "A. Để ruộng ngập nước thường xuyên, chỉ tháo nước trước khi thu hoạch (CF - Continous flooding irrigation)",
                  value: 1,
                },
                {
                  label:
                    "B.  Rút nước giữa vụ (5-7 ngày) vào cuối thời kỳ đẻ nhánh (MS-Mid season drainage)",
                  value: 0.6,
                },
                {
                  label:
                    "C. Tưới nước khô ẩm xen kẽ (AWD-Alternative wetting and drying)- Rút nước nhiều hơn 2 lần/vụ lúa",
                  value: 0.52,
                },
              ],
            },
            label: "Vụ Hè Thu",
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_select,
            input1: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
            select1: {
              placeholder: "Chọn đáp án",
              code: "X",
              options: [
                {
                  label:
                    "A. Để ruộng ngập nước thường xuyên, chỉ tháo nước trước khi thu hoạch (CF - Continous flooding irrigation)",
                  value: 1,
                },
                {
                  label:
                    "B.  Rút nước giữa vụ (5-7 ngày) vào cuối thời kỳ đẻ nhánh (MS-Mid season drainage)",
                  value: 0.6,
                },
                {
                  label:
                    "C. Tưới nước khô ẩm xen kẽ (AWD-Alternative wetting and drying)- Rút nước nhiều hơn 2 lần/vụ lúa",
                  value: 0.52,
                },
              ],
            },
            label: "Vụ Thu Đông",
          },
        ],
      },
      {
        code: "SFp",
        title:
          "2. Doanh nghiệp của anh/chị Quản lý nước trên ruộng lúa trong thời gian đất nghỉ giữa 2 vụ lúa như thế nào?",
        values: [
          {
            code: "SFp",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                code: "SFp",
                label: "A. > 30 ngày và ruộng ngập nước",
                value: 1.9,
              },
              {
                code: "SFp",
                label: " B. < 180 ngày và ruộng không ngập nước",
                value: 1,
              },
              {
                code: "SFp",
                label: " C. > 180 ngày và ruộng không ngập nước",
                value: 0.68,
              },
            ],
          },
        ],
      },
      {
        code: "SFo",
        title: "3. Doanh nghiệp của bạn chọn giải pháp xử lý rơm rạ trên đồng ruộng như thế nào?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_select,
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Vùi rơm rạ tươi vào đất < 30 ngày trước khi trồng lúa",
                  value: 1,
                },
                {
                  label: "B. Vùi rơm rạ tươi vào đất > 30 ngày trước khi trồng lúa",
                  value: 0.29,
                },
                {
                  label: "C. Sản xuất than sinh học (TSH) từ rơm rạ, sau đó bón TSH trả lại đất",
                  value: 1,
                },
              ],
            },
            label: "Vụ Đông Xuân",
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_select,
            label: "Vụ Hè Thu",
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Vùi rơm rạ tươi vào đất < 30 ngày trước khi trồng lúa",
                  value: 1,
                },
                {
                  label: "B. Vùi rơm rạ tươi vào đất > 30 ngày trước khi trồng lúa",
                  value: 0.29,
                },
                {
                  label: "C. Sản xuất than sinh học (TSH) từ rơm rạ, sau đó bón TSH trả lại đất",
                  value: 1,
                },
              ],
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_select,
            label: "Vụ Thu Đông",
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Vùi rơm rạ tươi vào đất < 30 ngày trước khi trồng lúa",
                  value: 1,
                },
                {
                  label: "B. Vùi rơm rạ tươi vào đất > 30 ngày trước khi trồng lúa",
                  value: 0.29,
                },
                {
                  label: "C. Sản xuất than sinh học (TSH) từ rơm rạ, sau đó bón TSH trả lại đất",
                  value: 1,
                },
              ],
            },
          },
        ],
      },
      {
        code: "A",
        title: "4. Liều lượng rơm rạ bón/vùi trả lại ruộng cho 1 ha lúa trong một vụ (tấn/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input,
            input1: {
              placeholder: "Liều lượng (tấn)",
            },
            label: "Vụ Đông Xuân",
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input,
            input1: {
              placeholder: "Liều lượng (tấn)",
            },
            label: "Vụ Hè Thu",
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input,
            input1: {
              placeholder: "Liều lượng (tấn)",
            },
            label: "Vụ Thu Đông",
          },
        ],
      },
    ],
  },
  {
    code: 2,
    title: "PHÁT THẢI TỪ QUẢN LÝ RƠM RẠ SAU THU HOẠCH",
    questions: [
      {
        code: "E",
        title: "5. Doanh nghiệp của bạn chọn giải pháp xử lý rơm rạ trên đồng ruộng như thế nào? *",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_select,
            input1: {
              code: "S",
              placeholder: "Sản lượng (tấn)",
            },
            select1: {
              code: "S'",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Đốt rơm rạ trực tiếp trên ruộng sau thu hoạch lúa",
                  value: 289,
                },
                {
                  label: "B. Ủ hoai rơm rạ sau đó bón trả lại đất <30 ngày trước khi trồng lúa",
                  value: 640,
                },
                {
                  label:
                    "C. Ủ hoai rơm rạ sau đó bón trả lại đất  > 30 ngày trước khi trồng lúa trước khi trồng lúa (compost)",
                  value: 640,
                },
                {
                  label: "D. Mang rơm ra khỏi ruộng (sử dụng máy cuốn rơm)",
                  value: 550,
                },
              ],
            },
            label: "Vụ Đông Xuân",
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_select,
            input1: {
              code: "S",
              placeholder: "Sản lượng (tấn)",
            },
            select1: {
              code: "S'",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Đốt rơm rạ trực tiếp trên ruộng sau thu hoạch lúa",
                  value: 289,
                },
                {
                  label: "B. Ủ hoai rơm rạ sau đó bón trả lại đất <30 ngày trước khi trồng lúa",
                  value: 640,
                },
                {
                  label:
                    "C. Ủ hoai rơm rạ sau đó bón trả lại đất  > 30 ngày trước khi trồng lúa trước khi trồng lúa (compost)",
                  value: 640,
                },
                {
                  label: "D. Mang rơm ra khỏi ruộng (sử dụng máy cuốn rơm)",
                  value: 550,
                },
              ],
            },
            label: "Vụ Hè Thu",
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_select,
            input1: {
              code: "S",
              placeholder: "Sản lượng (tấn)",
            },
            select1: {
              code: "S'",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Đốt rơm rạ trực tiếp trên ruộng sau thu hoạch lúa",
                  value: 289,
                },
                {
                  label: "B. Ủ hoai rơm rạ sau đó bón trả lại đất <30 ngày trước khi trồng lúa",
                  value: 640,
                },
                {
                  label:
                    "C. Ủ hoai rơm rạ sau đó bón trả lại đất  > 30 ngày trước khi trồng lúa trước khi trồng lúa (compost)",
                  value: 640,
                },
                {
                  label: "D. Mang rơm ra khỏi ruộng (sử dụng máy cuốn rơm)",
                  value: 550,
                },
              ],
            },
            label: "Vụ Thu Đông",
          },
        ],
      },
    ],
  },
  {
    code: 3,
    title: "PHÁT THẢI KNK TỪ ÁP DỤNG PHÂN BÓN",
    questions: [
      {
        code: "EF",
        title: "6. Loại hình quản lý nước trong canh tác của doanh nghiệp là gì?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_select,
            label: "Vụ Đông Xuân",
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Ruộng ngập nước thường xuyên",
                  value: 0.003,
                },
                {
                  label: "B. Ruộng khô ẩm xen kẽ",
                  value: 0.005,
                },
              ],
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_select,
            label: "Vụ Hè Thu",
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Ruộng ngập nước thường xuyên",
                  value: 0.003,
                },
                {
                  label: "B. Ruộng khô ẩm xen kẽ",
                  value: 0.005,
                },
              ],
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_select,
            label: "Vụ Thu Đông",
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Ruộng ngập nước thường xuyên",
                  value: 0.003,
                },
                {
                  label: "B. Ruộng khô ẩm xen kẽ",
                  value: 0.005,
                },
              ],
            },
          },
        ],
      },
      {
        code: "?",
        title:
          "7. Trong quá trình canh tác lúa, doanh nghiệp của bạn có sử dụng phân chuồng hay phân hữu cơ không?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_select,
            label: "Vụ Đông Xuân",
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Bón phân chuồng tươi (farm yard manure)",
                  value: 0.003,
                },
                {
                  label: "B. Bón phân chuồng đã ủ hoai (compost)",
                  value: 0.005,
                },
                {
                  label:
                    "C. Bón phân hữu cơ vi sinh/sinh học (microbiological/biological organic fertilizer)",
                  value: 0.005,
                },
                {
                  label: "D. Bón phân xanh (green manure)",
                  value: 0.005,
                },
              ],
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_select,
            label: "Vụ Hè Thu",
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Bón phân chuồng tươi (farm yard manure)",
                  value: 0.003,
                },
                {
                  label: "B. Bón phân chuồng đã ủ hoai (compost)",
                  value: 0.005,
                },
                {
                  label:
                    "C. Bón phân hữu cơ vi sinh/sinh học (microbiological/biological organic fertilizer)",
                  value: 0.005,
                },
                {
                  label: "D. Bón phân xanh (green manure)",
                  value: 0.005,
                },
              ],
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_select,
            label: "Vụ Thu Đông",
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Bón phân chuồng tươi (farm yard manure)",
                  value: 0.003,
                },
                {
                  label: "B. Bón phân chuồng đã ủ hoai (compost)",
                  value: 0.005,
                },
                {
                  label:
                    "C. Bón phân hữu cơ vi sinh/sinh học (microbiological/biological organic fertilizer)",
                  value: 0.005,
                },
                {
                  label: "D. Bón phân xanh (green manure)",
                  value: 0.005,
                },
              ],
            },
          },
        ],
      },
      {
        code: "?",
        title:
          "8. Liều lượng phân chuồng hay phân hữu cơ sử dụng cho một ha lúa trong một vụ (tấn/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
      {
        code: "L1",
        title:
          "9. Lượng phân đạm mà doanh nghiệp của bạn sử dụng cho một ha lúa(kg phân đạm/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
      {
        code: "L2",
        title:
          "10. Lượng phân lân mà doanh nghiệp của bạn sử dụng cho một ha lúa (kg phân lân/ha/vụ)? * ",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
      {
        code: "L3",
        title:
          "11. Lượng phân kali mà doanh nghiệp của bạn sử dụng cho một ha lúa (kg phân kali/ha/vụ)? *",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
      {
        code: "L4",
        title:
          "12. Lượng phân phức hợp NPK mà doanh nghiệp của bạn sử dụng cho một ha lúa trong một vụ là bao nhiêu (kg phân NPK/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "X",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
    ],
  },
  {
    code: 4,
    title: "PHÁT THẢI KNK TỪ SẢN XUẤT PHÂN BÓN",
    questions: [
      {
        code: "x",
        title:
          "13. Trong quá trình canh tác lúa, doanh nghiệp của bạn có sử dụng phân chuồng hay phân hữu cơ không?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_select,
            label: "Vụ Đông Xuân",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (tấn)",
            },
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Bón phân chuồng tươi (farm yard manure)",
                  value: 1,
                },
                {
                  label: "B. Bón phân chuồng đã ủ hoai (compost)",
                  value: 1,
                },
                {
                  label:
                    "C. Bón phân hữu cơ vi sinh/sinh học (microbiological/biological organic fertilizer)",
                  value: 1,
                },
                {
                  label: "D. Bón phân xanh (green manure)",
                  value: 1,
                },
              ],
            },
          },
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_select,
            label: "Vụ Đông Xuân",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (tấn)",
            },
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Bón phân chuồng tươi (farm yard manure)",
                  value: 1,
                },
                {
                  label: "B. Bón phân chuồng đã ủ hoai (compost)",
                  value: 1,
                },
                {
                  label:
                    "C. Bón phân hữu cơ vi sinh/sinh học (microbiological/biological organic fertilizer)",
                  value: 1,
                },
                {
                  label: "D. Bón phân xanh (green manure)",
                  value: 1,
                },
              ],
            },
          },
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_select,
            label: "Vụ Đông Xuân",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (tấn)",
            },
            select1: {
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Bón phân chuồng tươi (farm yard manure)",
                  value: 1,
                },
                {
                  label: "B. Bón phân chuồng đã ủ hoai (compost)",
                  value: 1,
                },
                {
                  label:
                    "C. Bón phân hữu cơ vi sinh/sinh học (microbiological/biological organic fertilizer)",
                  value: 1,
                },
                {
                  label: "D. Bón phân xanh (green manure)",
                  value: 1,
                },
              ],
            },
          },
        ],
      },
      {
        code: "x",
        title:
          "14. Liều lượng phân chuồng hay phân hữu cơ sử dụng cho một ha lúa trong một vụ (tấn/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (tấn)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
      {
        code: "L1",
        title:
          "15. Lượng phân đạm mà doanh nghiệp của bạn sử dụng cho một ha lúa (kg phân đạm/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
      {
        code: "L2",
        title:
          "16. Lượng phân lân mà doanh nghiệp của bạn sử dụng cho một ha lúa (kg phân lân/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
      {
        code: "L3",
        title:
          "17. Lượng phân kali mà doanh nghiệp của bạn sử dụng cho một ha lúa (kg phân kali/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
      {
        code: "L4",
        title:
          "18. Lượng phân phức hợp NPK mà doanh nghiệp của bạn sử dụng cho một ha lúa trong một vụ là bao nhiêu (kg phân NPK/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
    ],
  },
  {
    code: 5,
    title: "PHÁT THẢI CO2 TỪ BÓN PHÂN UREA",
    questions: [
      {
        code: "L5",
        title:
          "19. Liệt kê các loại và lượng phân đạm mà doanh nghiệp của bạn sử dụng cho một ha lúa (kg phân đạm/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "kg",
              placeholder: "Liều lượng (kg)",
            },
            input2: {
              code: "ha",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
    ],
  },
  {
    code: 6,
    title: "PHÁT THẢI TỪ QUÁ TRÌNH SỬ DỤNG THÓC GIỐNG	",
    questions: [
      {
        code: "x",
        title: "20. Doanh nghiệp sử dụng giống lúa nào (lúa thuần, lúa lai)?",
        values: [],
      },
      {
        code: "6.1",
        title: "* Diện tích canh tác lúa thuần của doanh nghiệp là bao nhiêu ha/vụ?",
        values: [
          {
            code: "x",
            type: CbiQuantitativeQuestionType.row,
            rows: ["Phương án trả lời", "Lúa thuần", "Lúa lai"],
          },
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "A1",
              placeholder: "Diện tích (ha)",
            },
            input2: {
              code: "A2",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "A1",
              placeholder: "Diện tích (ha)",
            },
            input2: {
              code: "A2",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "A1",
              placeholder: "Diện tích (ha)",
            },
            input2: {
              code: "A2",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
      {
        code: "6.2",
        title: "* Doanh nghiệp cho biết lượng thóc giống sử dụng cho 1 ha lúa (kg/ha/vụ) ?",
        values: [
          {
            code: "x",
            type: CbiQuantitativeQuestionType.row,
            rows: ["Phương án trả lời", "Lúa thuần", "Lúa lai"],
          },
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "S1",
              placeholder: "Số lượng (kg)",
            },
            input2: {
              code: "S2",
              placeholder: "Số lượng (kg)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "S1",
              placeholder: "Số lượng (kg)",
            },
            input2: {
              code: "S2",
              placeholder: "Số lượng (kg)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "S1",
              placeholder: "Số lượng (kg)",
            },
            input2: {
              code: "S2",
              placeholder: "Số lượng (kg)",
            },
          },
        ],
      },
    ],
  },
  {
    code: 7,
    title: "PHÁT THẢI TỪ THUỐC BẢO VỆ THỰC VẬT",
    questions: [
      {
        code: "isUseBVTV",
        title: "21. Doanh nghiệp anh chị có sử dụng thuốc BVTV trong canh tác lúa?",
        values: [
          {
            code: "isUseBVTV",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                label: "A. Không sử dụng",
                value: 0,
              },
              {
                label: "B. Có sử dụng",
                value: 1,
              },
            ],
          },
        ],
      },
      {
        code: "7.1",
        title:
          "* Nếu có sử dụng thuốc BVTV, thì trong 1 vụ, số lần phun thuốc BVTV của doanh nghiệp anh chị là bao nhiêu? ",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_select,
            label: "Vụ Đông Xuân",
            input1: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
            select1: {
              code: "B",
              placeholder: "Số lần",
              options: [
                {
                  label: "A. Không phun",
                  value: 0,
                },
                {
                  label: "B. 2- 4 lần phun/vụ",
                  value: 66.3,
                },
                {
                  label: "C. Trên 4 lần phun/vụ",
                  value: 257,
                },
              ],
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_select,
            label: "Vụ Hè Thu",
            input1: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
            select1: {
              code: "B",
              placeholder: "Số lần",
              options: [
                {
                  label: "A. Không phun",
                  value: 0,
                },
                {
                  label: "B. 2- 4 lần phun/vụ",
                  value: 66.3,
                },
                {
                  label: "C. Trên 4 lần phun/vụ",
                  value: 257,
                },
              ],
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_select,
            label: "Vụ Thu Đông",
            input1: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
            select1: {
              code: "B",
              placeholder: "Số lần",
              options: [
                {
                  label: "A. Không phun",
                  value: 0,
                },
                {
                  label: "B. 2- 4 lần phun/vụ",
                  value: 66.3,
                },
                {
                  label: "C. Trên 4 lần phun/vụ",
                  value: 257,
                },
              ],
            },
          },
        ],
      },
      {
        code: "isProduceBVTV",
        title:
          "22. Doanh nghiệp của bạn có sản xuất thuốc bảo vệ thực vật để cung cấp cho quá trình sản xuất lúa gạo hay không? *",
        values: [
          {
            code: "isProduceBVTV",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                label: "A. Có sản xuất thuốc BVTV",
                value: 1,
              },
              {
                label: "B. Không sản xuất thuốc BVTV",
                value: 0,
              },
            ],
          },
        ],
      },
      {
        code: "7.2",
        title: "* Nếu có thì lượng sản xuất là bao nhiêu kg ai/ha/vụ?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
            input2: {
              code: "C",
              placeholder: "Khối lượng (kg)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
            input2: {
              code: "C",
              placeholder: "Khối lượng (kg)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "A",
              placeholder: "Diện tích (ha)",
            },
            input2: {
              code: "C",
              placeholder: "Khối lượng (kg)",
            },
          },
        ],
      },
    ],
  },
  {
    code: 8,
    title: "PHÁT THẢI TỪ SỬ DỤNG MÁY MÓC TRONG SẢN XUẤT LÚA GẠO",
    questions: [
      {
        code: "8.13",
        title: "23. Diện tích gieo trồng của doanh nghiệp?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input,
            label: "Vụ đông xuân",
            input1: {
              code: "S",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input,
            label: "Vụ hè thu",
            input1: {
              code: "S",
              placeholder: "Diện tích (ha)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input,
            label: "Vụ thu đông",
            input1: {
              code: "S",
              placeholder: "Diện tích (ha)",
            },
          },
        ],
      },
      {
        code: "8.1",
        title: "24. Doanh nghiệp có sử dụng máy để bón phân hay không?",
        values: [
          {
            code: "isUseMachine",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                label: "A. Không",
                value: 0,
              },
              {
                label: "B. Có",
                value: 1,
              },
            ],
          },
        ],
      },
      {
        code: "8.2",
        title:
          "* Nếu có sử dụng máy, thì loại và lượng nhiên liệu sử dụng cho việc bón phân bằng máy là bao nhiêu ?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "Vụ đông xuân",
            select1: {
              placeholder: "Chọn đáp án",
              code: "D",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "Vụ hè thu",
            select1: {
              placeholder: "Chọn đáp án",
              code: "D",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "Vụ thu đông",
            select1: {
              placeholder: "Chọn đáp án",
              code: "D",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
        ],
      },
      {
        code: "8.3",
        title: "25. Doanh nghiệp của bạn phun thuốc BVTV bằng tay hay bằng máy *",
        values: [
          {
            code: "isUseMachine",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                label: "A. Sử dụng máy phun thuốc (drone…)",
                value: 1,
              },
              {
                label: "B. Phun tay",
                value: 0,
              },
            ],
          },
        ],
      },
      {
        code: "8.4",
        title:
          "* Nếu phun thuốc BVTV bằng máy, thì loại nhiên liệu và lượng nhiên liệu sử dụng cho phun thuốc BVTV là bao nhiêu?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "A. Vụ lúa Đông Xuân (…./ha/vụ)",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "B. Vụ lúa Hè Thu (kg ai/ha/vụ)",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "C. Vụ lúa Thu Đông (kg ai/ha/vụ)",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
        ],
      },
      {
        code: "8.5",
        title: "26. Tổng lượng nước sử dụng tưới một ha lúa trong một vụ là bao nhiêu (m3/ha/vụ)?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input,
            label: "Vụ Đông Xuân",
            input1: {
              code: "A",
              placeholder: "Số lượng (m3)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input,
            label: "Vụ Hè Thu",
            input1: {
              code: "A",
              placeholder: "Số lượng (m3)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input,
            label: "Vụ Thu Đông",
            input1: {
              code: "A",
              placeholder: "Số lượng (m3)",
            },
          },
        ],
      },
      {
        code: "8.12",
        title:
          "27. Loại và lượng nhiên liệu sử dụng để vận hành máy bơm tưới/tiêu cho 1 ha lúa trong một vụ ? (Lít xăng hoặc dầu /ha/vụ hoặc kwh/ha/vụ",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "A. Vụ lúa Đông Xuân (…./ha/vụ)",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "B. Vụ lúa Hè Thu (kg ai/ha/vụ)",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "C. Vụ lúa Thu Đông (kg ai/ha/vụ)",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
        ],
      },
      {
        code: "8.6",
        title: "28. Doanh nghiệp của bạn đang sử dụng máy móc gì để thu hoạch lúa?",
        values: [
          {
            code: "G",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                label: "A. Sử dụng tay và máy tuốt lúa",
                value: 90.62,
              },
              {
                label: "B. Sử dụng máy gặt đập liên hợp",
                value: 194,
              },
            ],
          },
        ],
      },
      {
        code: "8.7",
        title:
          "* Lượng nhiên liệu sử dụng để vận hành các loại máy móc này là bao nhiêu (lít dầu diesel/ha/vụ)",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_input,
            label: "A. Vụ lúa Đông Xuân",
            input1: {
              code: "A",
              placeholder: "Số lượng (l)",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_input,
            label: "B. Vụ lúa Hè Thu",
            input1: {
              code: "A",
              placeholder: "Số lượng (l)",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_input,
            label: "C. Vụ lúa Thu Đông ",
            input1: {
              code: "A",
              placeholder: "Số lượng (l)",
            },
          },
        ],
      },
      {
        code: "8.8",
        title: "29. Doanh nghiệp của bạn sử dụng sạ/cấy bằng máy hay bằng tay?",
        values: [
          {
            code: "isUseMachine",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                label: "A. Bằng tay",
                value: 0,
              },
              {
                label: "B. Bằng máy",
                value: 1,
              },
            ],
          },
        ],
      },
      {
        code: "8.9",
        title:
          "* Doanh nghiệp sử dụng sạ/cấy bằng máy thì nhiên liệu sử dụng sạ là gì? với lượng là bao nhiêu cho 1 ha lúa trong 1 vụ?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "A. Vụ lúa Đông Xuân",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "B. Vụ lúa Hè Thu",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "C. Vụ lúa Thu Đông",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
        ],
      },
      {
        code: "8.10",
        title: "30. Doanh nghiệp của anh chị làm đất bằng trâu, bò hay máy làm đất?",
        values: [
          {
            code: "isUseMachine",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                label: "A. Máy làm đất",
                value: 1,
              },
              {
                label: "B. Sử dụng trâu/bò",
                value: 0,
              },
            ],
          },
        ],
      },
      {
        code: "8.11",
        title:
          "* Nếu sử dụng máy cày bừa, thì lượng nhiên liệu sử dụng cho 1 ha lúa trong 1 vụ là bao nhiêu ?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "A. Vụ lúa Đông Xuân",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "B. Vụ lúa Hè Thu",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "C. Vụ lúa Thu Đông",
            select1: {
              code: "D",
              placeholder: "Chọn đáp án",
              options: [
                {
                  label: "A. Dầu (l/ha/vụ)",
                  value: 74539,
                },
                {
                  label: "B. Xăng (l/ha/vụ)",
                  value: 69739,
                },
                {
                  label: "C. Điện (kW/ha/vụ)",
                  value: 0.8649,
                },
                {
                  label: "D. Khác",
                  value: 0,
                },
              ],
            },
            input1: {
              code: "A",
              placeholder: "Số lượng",
            },
          },
        ],
      },
    ],
  },
  {
    code: 9,
    title: "PHÁT THẢI TRONG VẬN CHUYỂN THÓC TỪ RUỘNG VỀ NHÀ",
    questions: [
      {
        code: "S",
        title: "31. Phương tiện vận chuyển lúa từ ruộng về nhà máy xay sát gạo là gì?",
        values: [
          {
            code: "S",
            type: CbiQuantitativeQuestionType.label_input,
            label: "Tổng sản lượng lúa trong các mùa vụ",
            input1: {
              code: "S",
              placeholder: "Sản lượng (tấn)",
            },
          },
        ],
      },
      {
        code: "",
        title: "* Chiều dài quãng đường vận chuyển thóc lúa từ ruộng đến nhà máy xay sát (km)",
        values: [
          {
            code: "H1",
            type: CbiQuantitativeQuestionType.select_input,
            // label: "A. Vận chuyển bằng xe tải",
            select1: {
              code: "H",
              placeholder: "Chọn phương tiện",
              options: [
                {
                  label: "A. Vận chuyển bằng xe tải",
                  value: 0.4,
                },
                {
                  label: "B. Máy kéo và rơ móc",
                  value: 0.257,
                },
                {
                  label: "C. Vận chuyển bằng tàu/thuyền",
                  value: 0.0225,
                },
              ],
            },
            input1: {
              code: "I",
              placeholder: "Chiều dài (km)",
            },
          },
        ],
      },
    ],
  },
  {
    code: 10,
    title: "PHÁT THẢI TỪ SẤY LÚA",
    questions: [
      {
        code: "x",
        title: "32. Liều lượng nhiên liệu sử dụng cho sấy 1 tấn lúa là bao nhiêu ?",
        values: [
          {
            code: "x1",
            type: CbiQuantitativeQuestionType.label_input,
            label: "A. Than (kg/tấn lúa)",
            input1: {
              placeholder: "Số lượng (kg)",
            },
          },
          {
            code: "x2",
            type: CbiQuantitativeQuestionType.label_input,
            label: "B. Trấu (kg/tấn lúa)",
            input1: {
              placeholder: "Số lượng (kg)",
            },
          },
          {
            code: "x3",
            type: CbiQuantitativeQuestionType.label_input,
            label: "C. Điện (kW/tấn lúa)",
            input1: {
              placeholder: "Số lượng (kg)",
            },
          },
        ],
      },
      {
        code: "10.1",
        title:
          "33. Doanh nghiệp của anh/chị áp dụng công nghệ sấy lúa nào? Với lượng tiêu thụ nhiên liệu là bao nhiêu cho một ha lúa trong một vụ?",
        values: [
          {
            code: "VDX",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "Vụ Đông Xuân",
            select1: {
              placeholder: "Chọn đáp án",
              code: "K",
              options: [
                {
                  label: "A. Phơi lúa dưới nắng (mặt trời)",
                  value: 0,
                },
                {
                  label: "B. Sấy lúa bằng lò sử dụng năng lượng mặt trời áp tuần hoàn",
                  value: 6,
                },
                {
                  label: "C. Sấy lúa bằng lò sấy vỉ ngang",
                  value: 168,
                },
                {
                  label: "D. Sấy lúa bằng lò sấy tháp tuần hoàn",
                  value: 168,
                },
              ],
            },
            input1: {
              code: "S",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VHT",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "Vụ Hè Thu",
            select1: {
              placeholder: "Chọn đáp án",
              code: "K",
              options: [
                {
                  label: "A. Phơi lúa dưới nắng (mặt trời)",
                  value: 0,
                },
                {
                  label: "B. Sấy lúa bằng lò sử dụng năng lượng mặt trời áp tuần hoàn",
                  value: 6,
                },
                {
                  label: "C. Sấy lúa bằng lò sấy vỉ ngang",
                  value: 168,
                },
                {
                  label: "D. Sấy lúa bằng lò sấy tháp tuần hoàn",
                  value: 168,
                },
              ],
            },
            input1: {
              code: "S",
              placeholder: "Số lượng",
            },
          },
          {
            code: "VTD",
            type: CbiQuantitativeQuestionType.label_select_input,
            label: "Vụ Thu Đông",
            select1: {
              placeholder: "Chọn đáp án",
              code: "K",
              options: [
                {
                  label: "A. Phơi lúa dưới nắng (mặt trời)",
                  value: 0,
                },
                {
                  label: "B. Sấy lúa bằng lò sử dụng năng lượng mặt trời áp tuần hoàn",
                  value: 6,
                },
                {
                  label: "C. Sấy lúa bằng lò sấy vỉ ngang",
                  value: 168,
                },
                {
                  label: "D. Sấy lúa bằng lò sấy tháp tuần hoàn",
                  value: 168,
                },
              ],
            },
            input1: {
              code: "S",
              placeholder: "Số lượng",
            },
          },
        ],
      },
    ],
  },
  {
    code: 11,
    title: "PHÁT THẢI TỪ BẢO QUẢN LÚA",
    questions: [
      {
        code: "11.1",
        title: "34. Doanh nghiệp của anh/chị trữ lúa trong thời gian bao lâu?",
        values: [
          {
            code: "isSelected",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                label: "A. Dưới 6 tháng",
                value: 0,
              },
              {
                label: "B. Trên 6 tháng",
                value: 1,
              },
            ],
          },
        ],
      },
      {
        code: "11.2",
        title: "* Doanh nghiệp sử dụng cách thức nào để chứa thóc?",
        values: [
          {
            code: "S",
            type: CbiQuantitativeQuestionType.label_input,
            label: "Tổng sản lượng lúa trong các mùa vụ",
            input1: {
              code: "S",
              placeholder: "Sản lượng (tấn)",
            },
          },
          {
            code: "M",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                code: "M",
                label:
                  "A. Chứa trong các bao bì được xếp chồng ở các nhà kho số lượng nhỏ  (chứa trong 6 tháng) (bag-stacking warehouse)",
                value: 11,
              },
              {
                code: "M",
                label: "B. Chứa trong túi kín khí (chứa trong 6 tháng) (hermetic bag storage)",
                value: 16,
              },
              {
                code: "M",
                label: "C. Chứa trong kho lưu trữ  (chứa trong 6 tháng) (farmer-granary storage)",
                value: 24.4,
              },
              {
                code: "M",
                label:
                  "D. Chứa trong các bao bì được xếp chồng với số lượng lớn (chứa trong 6 tháng) (bulk-stacking warehouse)",
                value: 9.4,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 12,
    title: "PHÁT THẢI TỪ QUY TRÌNH XAY SÁT LÚA",
    questions: [
      {
        code: "E",
        title:
          "35. Loại gạo xay sát (gạo trắng/ gạo lứt) và nhiên liệu sử dụng cho xay sát gạo là gì?",
        values: [
          {
            code: "S",
            type: CbiQuantitativeQuestionType.label_input,
            label: "Tổng sản lượng lúa trong các mùa vụ",
            input1: {
              code: "S",
              placeholder: "Sản lượng (tấn)",
            },
          },
          {
            code: "N",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                code: "N",
                label: "A. Xay sát gạo lứt (bằng điện)",
                value: 105,
              },
              {
                code: "N",
                label: "B. Xay sát gạo trắng (bằng điện)",
                value: 210,
              },
              {
                code: "N",
                label: "C. Xay sát gạo trắng (dầu diesel)",
                value: 210,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: 13,
    title: "PHÁT THẢI TỪ QUÁ TRÌNH ĐÓNG GÓI",
    questions: [
      {
        code: "E",
        title:
          "36. Doanh nghiệp của anh chị sử dụng đóng gói gạo thành phẩm bằng máy hay bằng tay?",
        values: [
          {
            code: "S",
            type: CbiQuantitativeQuestionType.label_input,
            label: "Tổng sản lượng lúa trong các mùa vụ",
            input1: {
              code: "S",
              placeholder: "Sản lượng (tấn)",
            },
          },
          {
            code: "O",
            type: CbiQuantitativeQuestionType.radio,
            groups: [
              {
                code: "O",
                label: "A. Đóng gói bằng máy",
                value: 2,
              },
              {
                code: "O",
                label: "B. Đóng gói bằng tay",
                value: 0,
              },
            ],
          },
        ],
      },
    ],
  },
];
