import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { Prestation } from "@app/models";
import { PrestationsService } from "@app/services";
import { PrestationsStore } from "@app/shared/store/prestations.store";
import { combineLatest, Observable } from "rxjs";
import { takeWhile, mergeMap, startWith, map, tap } from "rxjs/operators";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: '[app-prestations]',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.scss']
})
export class PrestationsComponent implements OnInit, OnDestroy {

  availablePrestations: Prestation[] = [];
  allPrestations: Prestation[] = [];
  filteredPrestations: Prestation[] = [];
  selectedPrestations: Record<string, Prestation> = {};
  categories: string[] = [];
  allCategories: string [] = [];
  isLoading = true;

  category = new FormControl('');
  tag = new FormControl('');
  formGroup!: FormGroup;

  filteredCategories$!: Observable<string[]>;

  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;
  @ViewChild('trigger') trigger!: MatAutocompleteTrigger;

  private isAlive = true;

  constructor(private prestationsService: PrestationsService, private prestationsStore: PrestationsStore,
              private fb: FormBuilder) {}

  ngOnInit() {
    // Creation of{ prestations filter form
    const { category, tag } = this;
    this.formGroup = this.fb.group({
      category,
      tag
    });

    // Get prestations' categories
    const categories$ = this.prestationsService.getPrestationCategories().pipe(
      takeWhile(() => this.isAlive),
      tap(allCategories => {
        this.allCategories = allCategories;
        this.categories = allCategories;
        this.filteredCategories$ = this.category.valueChanges.pipe(
          startWith(null),
          map((categoryInput: string | null) => this.filter(categoryInput || '')));
      }));

    const allPrestations$ = this.prestationsService.getPrestations();
    const selectedPrestations$ = this.prestationsStore.watch();

    combineLatest([categories$, allPrestations$, selectedPrestations$]).pipe(
      takeWhile(() => this.isAlive),
    ).subscribe(([categories, allPrestations, selectedPrestations]) => {
        // stop loading
        this.isLoading = false;

        // bind all prestations
        this.allPrestations = allPrestations;

        // sort prestations to display
        const { byAlphabetical } = this;
        this.availablePrestations = allPrestations.sort(byAlphabetical); // prestations that will be displayed, will be reassigned regarding user selection/filters

        const currentSelectedPrestations: Prestation[] = [...Object.keys(selectedPrestations)].map(prestationId => selectedPrestations[prestationId]) || [];
        const formerSelectedPrestations: Prestation[] = [...Object.keys(this.selectedPrestations)].map(prestationId => this.selectedPrestations[prestationId]) || [];

        // remove prestations already selected
        this.availablePrestations = this.availablePrestations.reduce((acc, curr) => {
          if (!selectedPrestations.hasOwnProperty(curr.id)) {
            acc.push(curr);
          }
          return acc;
        }, [] as Prestation[]);

        setTimeout(() => { this.filteredPrestations = this.getFilteredPrestations(this.availablePrestations); });

        this.selectedPrestations = {...selectedPrestations};
    });

    this.tag.valueChanges.pipe(
      takeWhile(() => this.isAlive)
    ).subscribe(keyWordInput => {
      if (!keyWordInput) {
        this.filteredPrestations = this.availablePrestations;
      }

      const keywordWithoutDiacritics = this.getLowerWithoutDiacritics(keyWordInput);
      this.filteredPrestations = this.availablePrestations.filter(ap => {
        const prestationName = this.getLowerWithoutDiacritics(ap.name);
        const prestationDescription = this.getLowerWithoutDiacritics(ap.description || '');
        const prestationCategory = this.getLowerWithoutDiacritics(ap.category.name);

        return prestationName.includes(keywordWithoutDiacritics)
          || prestationDescription.includes(keywordWithoutDiacritics)
          || prestationCategory.includes(keywordWithoutDiacritics);
      });
    })


  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  add(prestation: Prestation) {
    // add prestation to selectedPrestations in store
    this.prestationsStore.add(prestation);
  }

  addCategory(event: MatChipInputEvent) {
    const category = (event.value || '').trim();

    // Add category
    if (category) {
      this.categories = [...this.categories, category];
    }

    // Clear input value
    event.chipInput!.clear();
    this.category.setValue(null);

    this.filteredPrestations = this.getFilteredPrestations(this.availablePrestations);
  }

  removeCategory(category: string) {
    const filteredCategories = this.categories.filter(c => c != category);
    this.categories = filteredCategories;
    this.category.setValue(this.category.value);

    this.filteredPrestations = this.getFilteredPrestations(this.availablePrestations);
  }

  selectedCategory(event: MatAutocompleteSelectedEvent) {
    const category = event.option.viewValue;
    this.categories = [...this.categories, category];

    this.categoryInput.nativeElement.value = '';
    this.category.setValue(null);
    setTimeout(() => { this.trigger?.openPanel(); });
    this.filteredPrestations = this.getFilteredPrestations(this.availablePrestations);
  }

  onCategoryInputClick(event: Event) {
    event.stopPropagation();
    this.trigger?.openPanel();
  }

  private getFilteredPrestations(prestations: Prestation[]) {
    return prestations.filter(p => this.categories.indexOf(p.category.name) >= 0);
  }

  private byAlphabetical(a: Prestation, b: Prestation) {
    return a?.name.toLowerCase().localeCompare(b?.name.toLowerCase());
  }

  private filter(userInput: string) {
    let filterCategory = this.getLowerWithoutDiacritics(userInput);
    const categories = this.allCategories.filter(c => this.categories.indexOf(c) === -1);

    if (!filterCategory) {
      return categories;
    }

    return categories.filter(c => {
      let categoryWithoutDiacritics = this.getLowerWithoutDiacritics(c);
      return categoryWithoutDiacritics.toLowerCase().includes(filterCategory)
    });
  }

  private getLowerWithoutDiacritics(word: string) {
    let wordWithoutDiacritics = word.toLowerCase();
    wordWithoutDiacritics = wordWithoutDiacritics.replace(new RegExp("[àáâãäå]", 'g'), "a");
    wordWithoutDiacritics = wordWithoutDiacritics.replace(new RegExp("[èéêë]", 'g'), "e");
    return wordWithoutDiacritics;
  }

}