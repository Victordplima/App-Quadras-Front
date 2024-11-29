// import React, { useState } from "react";
// import styled from "styled-components";

// // Estilos
// const FilterContainer = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 20px;
//     flex-wrap: wrap;
// `;

// const FilterInput = styled.input`
//     padding: 8px 12px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     width: 250px;
//     font-size: 14px;
//     margin-right: 10px;
// `;

// const DropdownContainer = styled.div`
//     position: relative;
//     margin-right: 10px;
// `;

// const DropdownButton = styled.button`
//     padding: 8px 12px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     background-color: #fff;
//     cursor: pointer;
//     font-size: 14px;
//     width: 200px;
//     text-align: left;

//     &:hover {
//         background-color: #f0f0f0;
//     }
// `;

// const DropdownMenu = styled.ul`
//     position: absolute;
//     top: 100%;
//     left: 0;
//     width: 100%;
//     background-color: #fff;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     list-style: none;
//     margin: 0;
//     padding: 10px;
//     box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//     z-index: 10;
// `;

// const DropdownItem = styled.li`
//     display: flex;
//     align-items: center;
//     padding: 5px 0;
//     font-size: 14px;

//     &:hover {
//         background-color: #f0f0f0;
//     }
// `;

// const Checkbox = styled.input`
//     margin-right: 10px;
// `;

// const SelectFilter = styled.select`
//     padding: 8px 12px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     width: 250px;
//     font-size: 14px;
//     transition: border-color 0.3s;

//     &:focus {
//         border-color: #007bff;
//         outline: none;
//     }
// `;

// // Componente de filtro
// const FiltroAgendamentos = ({
//     statusFilter,
//     setStatusFilter,
//     searchText,
//     setSearchText,
//     sortOrder,
//     setSortOrder,
// }) => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

//     const handleStatusChange = (status) => {
//         const updatedStatusFilter = statusFilter.includes(status)
//             ? statusFilter.filter((item) => item !== status)
//             : [...statusFilter, status];
//         setStatusFilter(updatedStatusFilter);
//     };

//     return (
//         <FilterContainer>
//             <FilterInput
//                 type="text"
//                 placeholder="Buscar por nome, matrícula ou curso"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//             />

//             {/* Dropdown de Status */}
//             <DropdownContainer>
//                 <DropdownButton onClick={handleDropdownToggle}>
//                     Filtros de status
//                 </DropdownButton>
//                 {isDropdownOpen && (
//                     <DropdownMenu>
//                         {[
//                             "Aguardando confirmação",
//                             "Confirmada",
//                             "Cancelada",
//                             "Rejeitada",
//                             "Concluída",
//                         ].map((status) => (
//                             <DropdownItem key={status}>
//                                 <Checkbox
//                                     type="checkbox"
//                                     checked={statusFilter.includes(status)}
//                                     onChange={() => handleStatusChange(status)}
//                                 />
//                                 {status}
//                             </DropdownItem>
//                         ))}
//                     </DropdownMenu>
//                 )}
//             </DropdownContainer>

//             {/* Filtro de ordenação */}
//             <SelectFilter
//                 onChange={(e) => setSortOrder(e.target.value)}
//                 value={sortOrder}
//             >
//                 <option value="pedido">
//                     Ordenar por data e hora do pedido
//                 </option>
//                 <option value="uso">Ordenar por data e hora de uso</option>
//             </SelectFilter>
//         </FilterContainer>
//     );
// };

// export default FiltroAgendamentos;
