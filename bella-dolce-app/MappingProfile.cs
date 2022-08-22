using AutoMapper;
using BellaDolce.WebApi.Core.Entities;
using BellaDolce.WebApi.Prestations.Models;

public class MappingProfile : Profile
{

    public MappingProfile()
    {
        CreateMap<PrestationEntity, Prestation>()
            .ForSourceMember(p => p.CategoryId, opt => opt.DoNotValidate());
        CreateMap<CategoryEntity, Category>();
    }
}